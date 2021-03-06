
const dataset = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5 76 62';

const goodData = dataset.split(' ');

const data = goodData.map(num => parseInt(num));


//  Exercise 1
const indexOf = (value, list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === value) {
      return i;
    }
  }
  return -1;
};


//Exercise 2
data.sort((a,b)=>a-b);
// console.log(data);
const binarySearch = (value, list, start, end) => {
  if(start > end){
    return -1;
  }

  const lastHalfIndex = Math.floor((start + end)/2);
  const item = list[lastHalfIndex];

  if(value === item){
    return lastHalfIndex;
  }
  else if(value < item){
    return binarySearch(value, list, start, lastHalfIndex - 1);
  }
  else{
    return binarySearch(value, list, lastHalfIndex + 1, end);
  }
};

// console.log(binarySearch(98, data, 0 , data.length));

// Exercise 3
const library = [
  {index: '005.133', title: 'Mike Cowlishaw: The REXX Language'},
  {index: '005.133', title: 'Mike Cowlishaw: The REXX Language'},
  {index: '005.133', title: 'Sams: Teach Yourself C++ In 21 Days'},
  {index: '005.133', title: 'Bjarne Stroustrup: The C++ Programming Language'},
  {index: '005.2762', title: 'Mike Cowlishaw: The REXX Language'},
  {index: '005.2762', title: 'Douglas Crockford: JavaScript: The Good Parts'},
  {index: '005.2762', title: 'David Flanagan: JavaScript: The Definitive Guide'},
  {index: '005.44684', title: 'Meinhard Schmidt: Windows Vista for Dummies'}, //It certainly is...
  {index: '007.121', title: 'This is a title'},
  {index: '220.52081', title: 'Zondervan: NIV Study Bible'},
  {index: '231.7652', title: 'Dr Russell Humphries: Starlight and Time'},
  {index: '623.82509051', title: 'Frederick Thomas Jane: Jane\'s Fighting Ships'}, //So far, the ships are winning.
  {index: '796.8092', title: 'Chuck Norris: The Official Chuck Norris Fact Book'},
];

const decimalSearch = (ddIndex, ddTitle, library, start = 0, end = library.length) => {
  if (Number(ddIndex) < Number(library[0].index) || Number(ddIndex) > Number(library[library.length - 1].index)) {
    return 'Index is out of bounds.';
  }

  if (start > end) {
    return -1;
  }

  const midIndex = Math.floor((start + end)/2);
  const item = library[midIndex];

  if (Number(ddIndex) === Number(item.index) && ddTitle === item.title) {
    return midIndex;
  }
  else if (ddIndex === item.index && ddTitle !== item.title) {
    let i = midIndex - 1;
    let r = midIndex;
    while (Number(library[i].index) === Number(ddIndex) || Number(library[r].index) === Number(ddIndex)) {
      if (library[i].title === ddTitle && Number(library[i].index) === Number(ddIndex)) {
        return i;
      }
      else if (library[r].title === ddTitle && Number(library[r].index) === Number(ddIndex)) {
        return r;
      }
      else {
        i--;
        r++;
      }
    }
    return -1;
  }
  else if (Number(ddIndex) < Number(item.index)) {
    return decimalSearch(ddIndex, ddTitle, library, start, midIndex - 1);
  }
  else if (Number(ddIndex) > Number(item.index)) {
    return decimalSearch(ddIndex, ddTitle, library, midIndex + 1, end);
  }

};

// console.log(decimalSearch('005.133', 'Mike Cowlishaw: The REXX Language', library));
// console.log(decimalSearch('005.2762', 'Mike Cowlishaw: The REXX Language', library));

// Exercise 4
class BinarySearchTree{
  constructor(key=null,value=null,parent=null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value){
    if(this.key === null){
      this.key = key;
      this.value = value;
    }
    else if(key < this.key){
      if(this.left === null){
        this.left = new BinarySearchTree(key, value, this);
      }
      else{
        this.left.insert(key,value);
      }
    }
    else{
      if(this.right === null){
        this.right = new BinarySearchTree(key, value, this);
      }
      else{
        this.right.insert(key,value);
      }
    }
  }
}

function preOrder(node, arr=[]){

  arr.push(node.key);
  if(node.left){
    preOrder(node.left, arr);
  }

  if(node.right){
    preOrder(node.right, arr);
  }
  return arr;
}

function inOrder(node, arr = []){
  if(node.left){
    inOrder(node.left, arr);
  }

  arr.push(node.key);

  if(node.right){
    inOrder(node.right, arr);
  }
  return arr;
}

function postOrder(node, arr = []){
  if(node.left){
    postOrder(node.left, arr);
  }

  if(node.right){
    postOrder(node.right, arr);
  }

  arr.push(node.key);
  return arr;
}

const bst = new BinarySearchTree();
const bsData = '25 15 50 10 22 24 35 70 4 12 18 31 44 66 90';
const splitBsData = bsData.split(' ');
const mapBsData = splitBsData.map(num => parseInt(num));
mapBsData.map(el=>bst.insert(el,''));
// console.log(preOrder(bst));
// console.log(inOrder(bst));
// console.log(postOrder(bst));

// Exercise 5
const sharePricesArray = [128, 97, 121, 123, 98, 97, 105];

const maxProfit = (sharesArray, dayOfWeek) => {
  const sharesTree = new BinarySearchTree();
  const remainder = sharesArray.slice(dayOfWeek);
  remainder.map((num, index) => sharesTree.insert(num, index));

  const myPrice = sharesTree.key;

  let node = sharesTree;
  while (node.left !== null) {
    node = node.left;
  }

  console.log(`You purchased shares at ${myPrice}. You're maximum profit is ${myPrice - node.key} per share from selling on day ${node.value}`);
};

// maxProfit(sharePricesArray, 0);
// maxProfit(sharePricesArray, 2);
// maxProfit(sharePricesArray, 4);
// maxProfit(sharePricesArray, 6);
// slice the array from the day, sort that, return last index


//Exercise 6
const floors = [];
for(let i = 0; i <= 100; i++){
  floors.push(i);
}

function isEggBroken(floors, eggs = 2, start = 0, end = floors.length){
  const index = Math.floor((start + end)/2);
  const item = floors[index];
  console.log(item,eggs);
  if(eggs < 1){
    return false;
  }

  if(item <= 15){
    return true;
  }
  else{
    return isEggBroken(floors, --eggs, start, index -1);
  }
}

function isEggBroken2(floors, eggs=2, breakEggIndex = 99){
  let tries = 0;  
  // for(let i = 0; i < floors.length; i= i+10){
  //   tries++;
  //   console.log('tries:', tries, i);
  //   if(floors[i] >= breakEggIndex){
  //     eggs--;
  //     for(let j = i-9; j < i; j++){
  //       tries++;
  //       console.log('tries inner', tries, j);
  //       if(floors[j] === breakEggIndex){
  //         eggs--;
  //         break;
  //       }
  //     }
  //     break;
  //   }
  // }

  for(let i = 1 ; i < floors.length; i = i*2){
    tries++;
    console.log('tries: ', tries, i);
    if(floors[i] >= breakEggIndex){
      egg--;
      
      for(let j = (i/2); j < i; j++){
        tries++;
        console.log('tries inner:', tries, j);
        if(floors[j] === breakEggIndex){
          eggs--;
          break;
        }
      }
      break;
    }
  }
  return tries;
}
// console.log(isEggBroken(floors));
console.log(isEggBroken2(floors));