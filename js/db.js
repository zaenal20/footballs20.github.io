// var dbPromised = idb.open("football_teams", 1, function(upgradeDb) {
//   var articlesObjectStore = upgradeDb.createObjectStore("articles", {
//     keyPath: "ID"
//   });
//   articlesObjectStore.createIndex("name", "name", { unique: false });
// });

// function saveForLater(article) {
//   dbPromised
//     .then(function(db) {
//       var tx = db.transaction("articles", "readwrite");
//       var store = tx.objectStore("articles");
//       console.log(article);
//       store.add(article);
//       return tx.complete;
//     })
//     .then(function() {
//       console.log("Artikel berhasil di simpan.");
//     });
// }

// function getAll() {
//   return new Promise(function(resolve, reject) {
//     dbPromised
//       .then(function(db) {
//         var tx = db.transaction("articles", "readonly");
//         var store = tx.objectStore("articles");
//         return store.getAll();
//       })
//       .then(function(articles) {
//         resolve(articles);
//       });
//   });
// }






const dbPromised = idb.open("datateam", 1, (upgradeDb) => {
  upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
});

const saveForLater = (data) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const transaction = db.transaction("teams", `readwrite`);
        transaction.objectStore("teams").put(data);
        return transaction;
      })
      .then((transaction) => {
        if (transaction.complete) {
          resolve(true);
          M.toast({
            html: `Ditambahkan Ke Pavorit.`,
            completeCallback: () => {
              location.href = "./#saved";
            },
          });
        } else {
          reject(new Error(transaction.onerror));
        }
      })
      .catch((error) => {
        console.log("gagal ditambahkan");
        M.toast({
          html: `gagal ditambahkan`,
        });
      });
  });
};
const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const transaction = db.transaction("teams", `readonly`);
        return transaction.objectStore("teams").getAll();
      })
      .then((data) => {
        if (data !== undefined) {
          console.log("Saved club have been loaded");
          resolve(data);
        } else {
          reject(new Error("Tidak bisa memuat Data"));
        }
      })
      .catch((error) => {
        M.toast({
          html: `Gagal Memuat`,
        });
      });
  });
};


const getById = (id) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then((teams) => {
        resolve(teams);
      })
      .catch((error) => {
        console.log('err');
        M.toast({
          html: 'gagal',
        });
        reject(error);
      });
  });
};


const deleteForSaved = (data) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const transaction = db.transaction("teams", `readwrite`);
        transaction.objectStore("teams").delete(Number(data.id));
        console.log(Number(data.id));
        return transaction;
      })
      .then((transaction) => {
        if (transaction.complete) {
          console.log("berhasil dihapus");
          M.toast({
            html: `Berhasil Dihapus`,
            completeCallback: () => {
              location.href = "./#saved";
            },
          });
          resolve(true);
        } else {
          reject(new Error(transaction.onerror));
        }
      })
      .catch((error) => {
        console.log('gagal dihapus');
        M.toast({
          html: 'gagal dihapus',
        });
      });
  });
};
