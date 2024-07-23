const { indexedDB } = require('fake-indexeddb');

const dbName = 'appointmentDB';
const dbVersion = 1;
let db;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function(event) {
      db = event.target.result;
      if (!db.objectStoreNames.contains('appointments')) {
        db.createObjectStore('appointments', { keyPath: 'id', autoIncrement: true });
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

function addAppointment(appointment) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['appointments'], 'readwrite');
      const store = transaction.objectStore('appointments');
      const request = store.add(appointment);

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Add appointment error: ' + request.error);
      };
    });
  });
}

function getAllAppointments() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['appointments'], 'readonly');
      const store = transaction.objectStore('appointments');
      const request = store.getAll();

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Get all appointments error: ' + request.error);
      };
    });
  });
}

function updateAppointment(id, updatedAppointment) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['appointments'], 'readwrite');
      const store = transaction.objectStore('appointments');
      const request = store.put({ ...updatedAppointment, id });

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Update appointment error: ' + request.error);
      };
    });
  });
}

function deleteAppointment(id) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['appointments'], 'readwrite');
      const store = transaction.objectStore('appointments');
      const request = store.delete(id);

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Delete appointment error: ' + request.error);
      };
    });
  });
}


//Essa função adiciona dados de exemplo na inicialização do banco de dados
function initializeDB() {
  const exampleAppointments = [
    { title: 'Reunião com equipe', dateTime: '25-07-2024T10:00:00Z', location: 'Sala de Conferências', description: 'Discutir o progresso do projeto' },
    { title: 'Consulta médica', dateTime: '26-07-2024T15:00:00Z', location: 'Clínica São João', description: 'Consulta de rotina com o Dr. Silva' },
    { title: 'Entrevista de emprego', dateTime: '27-07-2024T09:00:00Z', location: 'alguem me contrata porfavoooor', description: 'preciso de um emprego pelo amor de deus a vida do desenvolvendor não ta facil' }
  ];

  openDB().then(db => {
    const transaction = db.transaction(['appointments'], 'readwrite');
    const store = transaction.objectStore('appointments');

    exampleAppointments.forEach(appointment => {
      store.add(appointment);
    });

    transaction.oncomplete = function() {
      console.log('Dados de exemplo de compromissos adicionados com sucesso!');
    };

    transaction.onerror = function() {
      console.error('Erro ao adicionar dados de exemplo de compromissos: ' + transaction.error);
    };
  }).catch(error => {
    console.error('Erro ao abrir o banco de dados: ' + error);
  });
}
openDB().then(() => {
  initializeDB();
});

module.exports = { addAppointment, getAllAppointments, updateAppointment, deleteAppointment };
