const { indexedDB } = require('fake-indexeddb');

const dbName = 'notificationDB';
const dbVersion = 1;
let db;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function(event) {
      db = event.target.result;
      if (!db.objectStoreNames.contains('notifications')) {
        db.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });
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

function addNotification(notification) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['notifications'], 'readwrite');
      const store = transaction.objectStore('notifications');
      const request = store.add(notification);

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Add notification error: ' + request.error);
      };
    });
  });
}

function getAllNotifications() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['notifications'], 'readonly');
      const store = transaction.objectStore('notifications');
      const request = store.getAll();

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Get all notifications error: ' + request.error);
      };
    });
  });
}

function updateNotification(id, updatedNotification) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['notifications'], 'readwrite');
      const store = transaction.objectStore('notifications');
      const request = store.put({ ...updatedNotification, id });

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Update notification error: ' + request.error);
      };
    });
  });
}

function deleteNotification(id) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['notifications'], 'readwrite');
      const store = transaction.objectStore('notifications');
      const request = store.delete(id);

      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject('Delete notification error: ' + request.error);
      };
    });
  });
}

//Essa função adiciona dados de exemplo na inicialização do banco de dados
function initializeDB() {
  const exampleNotifications = [
    { title: 'Novo comentário', dateTime: '24-07-2024T09:00:00Z', message: 'Você recebeu um novo comentário em sua postagem.' },
    { title: 'Lembrete de reunião', dateTime: '25-07-2024T10:00:00Z', message: 'Não se esqueça da reunião marcada para hoje às 10h.' },
    { title: 'Atualização de software', dateTime: '26-07-2027T14:00:00Z', message: 'Uma nova versão do software está disponível para atualização.' }
  ];

  openDB().then(db => {
    const transaction = db.transaction(['notifications'], 'readwrite');
    const store = transaction.objectStore('notifications');

    exampleNotifications.forEach(notification => {
      store.add(notification);
    });

    transaction.oncomplete = function() {
      console.log('Dados de exemplo de notificações adicionados com sucesso!');
    };

    transaction.onerror = function() {
      console.error('Erro ao adicionar dados de exemplo de notificações: ' + transaction.error);
    };
  }).catch(error => {
    console.error('Erro ao abrir o banco de dados: ' + error);
  });
}
openDB().then(() => {
  initializeDB();
});

module.exports = { addNotification, getAllNotifications, updateNotification, deleteNotification };
