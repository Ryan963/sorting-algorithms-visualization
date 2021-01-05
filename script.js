//get the dom elements and the global varialbes for speed and size 
const barsContainer = document.querySelector('.container')
const makeArrayBtn = document.getElementById('new-array')
let size = 250;
let timeOut = 1
// make a function to generate a random array
let generateArray = (length, max) => [...new Array(length)]
    .map(() => Math.round(Math.random() * max) + 5);
// assign the random array to a variable 
let randomArray = generateArray(size, 600)

// create the bars by looping the random array and using each number as
// a height property for each div
function createBars(){
    barsContainer.innerHTML = ''
    randomArray.forEach((number,index) => {
        barsContainer.innerHTML+= `<div class="bar" id="${index}" style="height:${number}px"></div>`
    })
}

// bubble sort algorithm on random array and making animations on the bars
// while the algorithm is running
// add an onclick to the bubble sort button in the html
async function bubbleSort(arr = randomArray) {
    for (let i = arr.length - 1; i >= 0; i--){
        for (let j = 0; j < i; j++){
            let firstEl = document.getElementById(`${j}`)
            let secondEl = document.getElementById(`${j + 1}`)
            setTimeout(() => {
                firstEl.style.background = 'red'
                secondEl.style.background = 'red'
            }, (j + 1) * (timeOut/ 10))
            await sleep(timeOut / 10)
            if (arr[j] > arr[j + 1]){
                let temp = arr[j + 1]              
                secondEl.setAttribute('style', `height:${arr[j]}px`)
                firstEl.setAttribute('style', `height:${arr[j + 1]}px`)
                setTimeout(() => {
                    firstEl.style.background = 'cornflowerblue'
                    secondEl.style.background = 'cornflowerblue'
                }, (j + 1) * (timeOut /10 ))
                await sleep(timeOut / 10)
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
            else {
                setTimeout(() => {
                    firstEl.style.background = 'cornflowerblue'
                    secondEl.style.background = 'cornflowerblue'
                }, (j + 1) * (timeOut / 10))
            }
        }
    }
    finishedSort(arr)
}

// this function pauses time in ms to show any animations that are happening
async function sleep(i){
    await new Promise(r => setTimeout(r, i))
}

// function takes a number at the start index and sorts the array so that 
// this number is at its correct spot in the array
// the function is responsible for the quick sort animation as well
async function pivotPoint(arr, start = 0, end = arr.length - 1){
    let pivot = arr[start]
    let index = start
    let inc;
    let pivotEl = document.getElementById(`${start}`)
    for (let i = start + 1; i <= end; i++){
        let temp = arr[i]
        let firstEl = document.getElementById(`${i}`)
        changecolors(pivotEl, firstEl, 'red', i * 1)
        await sleep(timeOut)
        if (pivot > temp){
            index++
            let indexEl = document.getElementById(`${index}`)
            setTimeout(() => {
                indexEl.style.background = 'red'
            }, i * 1)
            await sleep(timeOut)
            indexEl.setAttribute('style', `height:${arr[i]}px`)
            firstEl.setAttribute('style', `height:${arr[index]}px`)
            changecolors(indexEl, firstEl, 'cornflowerblue', i * 2)
            await sleep(timeOut)
            arr[i] = arr[index]
            arr[index] = temp    
        }
        else {
            setTimeout(() => {
                firstEl.style.background = 'cornflowerblue'
            }, i * 2)
            await sleep(timeOut)
        }
        inc = i
    }
    let indexEl = document.getElementById(`${index}`)
    setTimeout(() => {
        indexEl.style.background = 'red'
    }, end * 3)
    await sleep(timeOut)
    indexEl.setAttribute('style', `height:${pivot}px`)
    pivotEl.setAttribute('style', `height:${arr[index]}px`)   
    changecolors(indexEl, pivotEl, 'cornflowerblue', end * 4)
    await sleep(timeOut)
    let position = arr[index]
    arr[index] = pivot
    arr[start] = position
    return index
}

// function performs quick sort algorithm
async function quickSort(arr = randomArray,left = 0, right = arr.length - 1){
    if (left < right){
        let pivot = await pivotPoint(arr, left, right)
        await quickSort(arr,left, pivot- 1)
        await quickSort(arr, pivot + 1, right)
    }
    if (left === 0 && right === arr.length - 1){
        finishedSort(arr)
    }
    return arr

}
// changes colors of 2 specific html elements after a specific time
function changecolors(first, second, color,time){
    setTimeout(() => {
        first.style.background = color
        second.style.background = color
    }, time)
}


// function performs insertion sort algorithm
async function insertionSort(arr = randomArray){
    for (let i = 1; i < arr.length; i++){
        let current = arr[i]
        var currentEl = document.getElementById(`${i}`)
        for (var j = i - 1; j >= 0 && arr[j] > current; j--){
            let tempEl = document.getElementById(`${j}`)
            changecolors(currentEl, tempEl, 'red', j + 1)
            await sleep(timeOut)
            let swapEl = document.getElementById(`${j + 1}`)
            swapEl.setAttribute('style', `height: ${arr[j]}px`)
            changecolors(currentEl, tempEl, 'cornflowerblue', (j + 1) * 2)
            await sleep(timeOut)
            arr[j + 1] = arr[j]
        }
        let lastSwapEl = document.getElementById(`${j + 1}`)
        changecolors(currentEl, lastSwapEl, 'red', (j + 1)* 3)
        await sleep(10)
        lastSwapEl.setAttribute('style', `height: ${current}px`)
        changecolors(currentEl, lastSwapEl, 'cornflowerblue', (j + 1)* 4)
        await sleep(timeOut)
        arr[j + 1] = current
    }
    finishedSort(arr)
}

// this function merges 2 sorted arrays of objects to make one sorted array 
// based on n in every object 
// after getting the sorted array it uses the index in each object to make 
// merge sort animations

async function merge(arr1, arr2){
let sorted = []
let x = 0
let y = 0
    while(x < arr1.length && y < arr2.length){
        if (arr1[x].n < arr2[y].n){    
            sorted.push(arr1[x])
            x++
        } else {
            sorted.push(arr2[y])
            y++
        }
    }
    while (x < arr1.length){
        sorted.push(arr1[x])
        x++
    }
    while (y < arr2.length){
        sorted.push(arr2[y])
        y++
    }
    const sortedIndexes = sorted.map(n => n.index).sort((a,b) => {return a - b})
    for (let i=0; i < sortedIndexes.length; i++){
        let element = document.getElementById(`${sortedIndexes[i]}`)
        setTimeout(() => {
            element.style.background = 'red'
        }, (i + 1) * 1)
        await sleep(timeOut)
        element.setAttribute('style', `height:${sorted[i].n}px`)
        setTimeout(() => {
            element.style.background = 'cornflowerblue'
        }, (i + 1) * 2)
        await sleep(timeOut)
    }
    if (sorted.length === objArr.length){
        finishedSort(sorted)
    }
    return sorted
}

let objArr = randomArray.map((n, index) => {return {n, index}})

// functions performs merge sort algorithm on an array of objects
async function mergeSort(arr = objArr){
    if (arr.length <= 1){return arr}
    let mid = Math.floor(arr.length / 2)
    let left = await mergeSort(arr.slice(0,mid))
    let right = await mergeSort(arr.slice(mid))
    return await merge(left, right)
}

// function turns a random array into a max heap 
async function maxHeap(arr, index,length){
    const left = index *2
    const right = index * 2 + 1
    let max = index
    if (right < length){
        if (arr[left] >= arr[right]){
            max = left
        }
        else {
            max = right
        }
    }
    else if (left < length){
        max = left
    }

    else return

    if (arr[index] < arr[max]){
         await swap(arr, index, max)
         await maxHeap(arr, max, length)
    }

    return
}

// swap 2 numbers in an array and get the elements at the id of those numbers
// to perform heap sort animations 
async function swap(arr, index, max){
    let indexEl = document.getElementById(`${index}`)
    let maxEl = document.getElementById(`${max}`)
    changecolors(indexEl, maxEl, 'red', index * 1)
    await sleep(timeOut)
    indexEl.setAttribute('style', `height:${arr[max]}px`)
    maxEl.setAttribute('style', `height:${arr[index]}px`)
    changecolors(indexEl, maxEl, 'cornflowerblue', index * 2)
    await sleep(timeOut)
    let temp = arr[index]
    arr[index] = arr[max]
    arr[max] = temp
}

// function sorts an array by heap sort algorithm
async function heapSort(arr = randomArray){
    let n = arr.length
    for(let i = Math.floor(n/2)-1; i >= 0;i--){
        await maxHeap(arr, i, n)
    }
    for (let i = n - 1; i >= 0; i--){
        await swap(arr, 0, i)
        await maxHeap(arr, 0, i)
    }
    finishedSort(arr)
    return arr
}

// creates an animation effect of color change when a sorting algorithm is done
function finishedSort(arr){
    arr.forEach((el, index) => {
        const bar = document.getElementById(`${index}`)
        setTimeout(() => {
            bar.style.backgroundColor = 'rgb(113, 20, 206)'
        }, index * 10)
    })
}

// changes the array to another random array and changees the bars in the dom as well
function changeArray(){
    randomArray = generateArray(size, 600)
    objArr = randomArray.map((n, index) => {return {n, index}})
    createBars()
}

// responsible for event listeners and window sizing conditionals
function main(){
    createBars()
    makeArrayBtn.addEventListener('click', changeArray)
   window.addEventListener('resize', () => {
        if (window.matchMedia("(max-width:850px)").matches){
            size = 100
            timeOut = 10
            changeArray()
        }
        else if(window.matchMedia("(max-width:1400px)").matches){
            size = 200
            timeOut = 5
            changeArray()
        }
        else {
            size = 250
            timeOut = 1
            changeArray()
        }
    })
    if (window.innerWidth < 450){
        timeOut = 20
        size=50
        changeArray()
    }
    else if (window.innerWidth < 850){
        timeOut = 10
        size = 100
        changeArray()
    }
    else if (window.innerWidth < 1400){
        size = 200
        changeArray()
    }
}

main()



