const { indexedDB, IDBKeyRange } = require('fake-indexeddb');

const dbName = 'taskDB';
const dbVersion = 1;
let db;


function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function(event) {
      db = event.target.result;
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = function(event) {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = function(event) {
      reject('Database error: ' + event.target.errorCode);
    };
  });
}

function addTask(task) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['tasks'], 'readwrite');
      const store = transaction.objectStore('tasks');
      const request = store.add(task);

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Add task error: ' + request.error);
      };
    });
  });
}

function getAllTasks() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['tasks'], 'readonly');
      const store = transaction.objectStore('tasks');
      const request = store.getAll();

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Get all tasks error: ' + request.error);
      };
    });
  });
}

function updateTask(id, updatedTask) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['tasks'], 'readwrite');
      const store = transaction.objectStore('tasks');
      const request = store.put({ ...updatedTask, id });

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Update task error: ' + request.error);
      };
    });
  });
}

function deleteTask(id) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['tasks'], 'readwrite');
      const store = transaction.objectStore('tasks');
      const request = store.delete(id);

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Delete task error: ' + request.error);
      };
    });
  });
}


//Essa função adiciona dados de exemplo na inicialização do banco de dados
function initializeDB() {
  const exampleTasks = [
    { title: 'Entregar do miniprojeto', description: 'fazer a entraga do miniprojeto e elaborar a apresentação do linkedin', dueDate: '23-07-2024' },
    { title: 'Reunião com equipe', description: 'Discutir o progresso do projeto', dueDate: '25-07-2024' },
    { title: 'Estudar para o exame', description: 'Revisar o material do curso', dueDate: '27-07-2024' }
  ];

  openDB().then(db => {
    const transaction = db.transaction(['tasks'], 'readwrite');
    const store = transaction.objectStore('tasks');

    exampleTasks.forEach(task => {
      store.add(task);
    });

    transaction.oncomplete = function() {
      console.log('Dados de exemplo de tasks adicionados com sucesso!');
    };

    transaction.onerror = function() {
      console.error('Erro ao adicionar dados de exemplo: ' + transaction.error);
    };
  }).catch(error => {
    console.error('Erro ao abrir o banco de dados: ' + error);
  });
}

openDB().then(() => {
  initializeDB();
});


module.exports = { addTask, getAllTasks, updateTask, deleteTask };
