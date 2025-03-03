import assert from 'assert';

// 1 ================== С бекенда приходит массив такого вида:
const arr = [
  { name: 'width', value: 10 },
  { name: 'height', value: 20 },
  // ...
];
// Нужно получить объект такого вида:
/*
{
width: 10,
height: 20,
...
}
*/

/**
 * @typedef Obj
 * @property {string} name
 * @property {number} value
 * @param {Array<Obj>} arr
 */
function test(arr) {
  return arr.reduce((acc, item) => {
    acc[item.name] = item.value;
    return acc;
  }, {});
}

assert.deepEqual(test(arr), { width: 10, height: 20 });

// 2 ==================
/**
 * Нужно написать функцию get. На вход функция принимает объект и путь до поля объекта.
 * Путь – это строка, разделенная точкой. Функция должна вернуть соответствующее поле объекта.
 * Запрашиваемого поля в объекте может не быть.
 */

/**
 * 
 * @param {Object} obj 
 * @param {string} path 
 */
function get(obj, path) {
  const pathArray = path.split('.');
  let pointer = obj;

  for (let i = 0; i < pathArray.length; i++) {
    if(typeof pointer !== "object" || pointer === null) {
      return
    }

    if(pointer.hasOwnProperty(pathArray[i])) {
      if(i === pathArray.length - 1) {
        return pointer[pathArray[i]];
      }
      pointer = pointer[pathArray[i]]
    } else {
      return
    }
  }
  return pointer;
}

const obj = {
  a: {
    b: {
      c: 'd',
    },
    x: null,
    e: null,
  },
};

assert.strictEqual(get(obj, 'a.b.c'), 'd');
assert.strictEqual(get(obj, 'a.e'), null);
assert.strictEqual(get(obj, 'a.x.e'), undefined);
assert.deepEqual(get(obj, 'a.b'), { c : 'd' });


// 3 ==================
// Написать функцию, которая принимает массив чисел. Необходимо определить монотонный он или нет.
// Примеры:
// [1, 2, 3] - true
// [6, 3, 2, 1] - true
// [5, 5] - true
// [1, 2, 5, 5, 5, 8, 9] - true
// [1, 2, 5, 5, 5, 2, 1] - false
// [1, 10, 6] - false
// [5, 5, 5, 1] - true
// [1] - true
/**
 * @param {Array<number>} arr
 */
function isMono(arr) {
  let mode = 0;
  let newMode = 0;

  for (let i = 1; i < arr.length; i++) {
    const prev = arr[i - 1];
    const current = arr[i];

    if (prev > current) {
      newMode = -1;
    }

    if(prev < current) {
      newMode = 1;
    }

    if (mode !== 0) {
      if (mode !== newMode) {
        return false;
      }
    }

    mode = newMode;
  }

  return true;
}

assert.strictEqual(isMono([1, 2, 3]), true);
assert.strictEqual(isMono([6, 3, 2, 1]), true);
assert.strictEqual(isMono([5, 5]), true);
assert.strictEqual(isMono([1, 2, 5, 5, 5, 8, 9]), true);
assert.strictEqual(isMono([1, 2, 5, 5, 5, 2, 1]), false);
assert.strictEqual(isMono([1, 10, 6]), false);
assert.strictEqual(isMono([5, 5, 5, 1]), true);
assert.strictEqual(isMono([1]), true);

// 4 ==================
// У нас есть функция asyncAuth(callback) , которая принимает функцию-обработчик, которой можно передать ошибку (1-й аргумент) или необходимые данные (2-й аргумент).
// Часть 1. Написать функцию auth , которая выполняет asyncAuth , но возвращает Promise .
function asyncAuth(cb) {
  // ...
};
// /**
//  * `asyncAuth()` function receives a callback into which
//  * an error may be passed (argument 1) or
//  * data from backend (argument 2).
//  *
//  * You need to implement an `auth()` function
//  * which executes `asyncAuth()`, but returns Promise.
//  *
//  * @returns {Promise}
//  */
function auth() {
  return new Promise((resolve, reject) =>
    asyncAuth((error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data);
    })
  );
}
