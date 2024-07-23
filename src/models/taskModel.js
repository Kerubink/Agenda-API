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

//essa função adiciona dados de exemplo na api quando o IndexedDB é iniciado
function initializeDB() {
  const exampleTasks = [
    { title: 'Comprar mantimentos', description: 'Ir ao supermercado e comprar itens da lista', dueDate: '2024-07-30' },
    { title: 'Reunião com equipe', description: 'Discutir o progresso do projeto', dueDate: '2024-07-25' },
    { title: 'Estudar para o exame', description: 'Revisar o material do curso', dueDate: '2024-07-28' }
  ];

  openDB().then(db => {
    const transaction = db.transaction(['tasks'], 'readwrite');
    const store = transaction.objectStore('tasks');

    exampleTasks.forEach(task => {
      store.add(task);
    });

    transaction.oncomplete = function() {
      console.log('Dados de exemplo adicionados com sucesso!');
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
