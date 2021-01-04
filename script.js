const barsContainer = document.querySelector('.container')
const mergeBtn = document.getElementById('merge')
const bubbleBtn = document.getElementById('bubble')
const quickBtn = document.getElementById('quick')
const makeArrayBtn = document.getElementById('new-array')
const insertionBtn = document.getElementById('insertion')
let generateArray = (length, max) => [...new Array(length)]
    .map(() => Math.round(Math.random() * max));
let randomArray = generateArray(100, 600)

function createBars(){
    barsContainer.innerHTML = ''
    randomArray.forEach((number,index) => {
        barsContainer.innerHTML+= `<div class="bar" id="${index}" style="height:${number}px"></div>`
    })
}


async function bubbleSort() {
    let arr = randomArray
    for (let i = arr.length - 1; i >= 0; i--){
        for (let j = 0; j < i; j++){
            let firstEl = document.getElementById(`${j}`)
            let secondEl = document.getElementById(`${j + 1}`)
            setTimeout(() => {
                firstEl.style.background = 'red'
                secondEl.style.background = 'red'
            }, (j + 1))
            await new Promise(r => setTimeout(r, 1))
            if (arr[j] > arr[j + 1]){
                let temp = arr[j + 1]              
                secondEl.setAttribute('style', `height:${arr[j]}px`)
                firstEl.setAttribute('style', `height:${arr[j + 1]}px`)
                setTimeout(() => {
                    firstEl.style.background = 'cornflowerblue'
                    secondEl.style.background = 'cornflowerblue'
                }, (j + 1) * 2)
                await new Promise(r => setTimeout(r, 2))
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
            else {
                setTimeout(() => {
                    firstEl.style.background = 'cornflowerblue'
                    secondEl.style.background = 'cornflowerblue'
                }, (j + 1) * 2)
            }
        }
    }
    arr.forEach((el, index) => {
        const bar = document.getElementById(`${index}`)
        setTimeout(() => {
            bar.style.backgroundColor = 'rgb(113, 20, 206)'
        }, index * 10)
    })
}
async function sleep(i){
    await new Promise(r => setTimeout(r, i))
}



async function pivotPoint(arr, start = 0, end = arr.length - 1){
    let pivot = arr[start]
    let index = start
    let inc;
    let pivotEl = document.getElementById(`${start}`)
    for (let i = start + 1; i <= end; i++){
        let temp = arr[i]
        let firstEl = document.getElementById(`${i}`)
        setTimeout(() => {
            firstEl.style.background = 'red'
            pivotEl.style.background = 'red'
        }, i * 1)
        await new Promise(r => setTimeout(r, 10))
        if (pivot > temp){
            index++
            let indexEl = document.getElementById(`${index}`)
            setTimeout(() => {
                indexEl.style.background = 'red'
            }, i * 2)
            await new Promise(r => setTimeout(r, 10))
            indexEl.setAttribute('style', `height:${arr[i]}px`)
            firstEl.setAttribute('style', `height:${arr[index]}px`)
            setTimeout(() => {
                firstEl.style.background = 'cornflowerblue'
                indexEl.style.background = 'cornflowerblue'
            }, i * 3)
            await new Promise(r => setTimeout(r, 10))
            arr[i] = arr[index]
            arr[index] = temp    
        }
        else {
            setTimeout(() => {
                firstEl.style.background = 'cornflowerblue'
            }, i * 3)
            await new Promise(r => setTimeout(r, 10))
        }
        inc = i
    }
    let indexEl = document.getElementById(`${index}`)
    setTimeout(() => {
        indexEl.style.background = 'red'
    }, end * 3)
    await new Promise(r => setTimeout(r, 10))
    indexEl.setAttribute('style', `height:${pivot}px`)
    pivotEl.setAttribute('style', `height:${arr[index]}px`)   
    setTimeout(() => {
        indexEl.style.background = 'cornflowerblue'
        pivotEl.style.background = 'cornflowerblue'
    }, end * 4)
    await new Promise(r => setTimeout(r, 10))
    let position = arr[index]
    arr[index] = pivot
    arr[start] = position
    return index
}


async function quickSort(arr = randomArray,left = 0, right = arr.length - 1){
    if (left < right){
        let pivot = await pivotPoint(arr, left, right)
        await quickSort(arr,left, pivot- 1)
        await quickSort(arr, pivot + 1, right)
    }
    if (left === 0 && right === arr.length - 1){
        arr.forEach((el, index) => {
            const bar = document.getElementById(`${index}`)
            setTimeout(() => {
                bar.style.backgroundColor = 'rgb(113, 20, 206)'
            }, index * 10)
        })
    }
    return arr

}

function changecolors(first, second, color,time){
    setTimeout(() => {
        first.style.background = color
        second.style.background = color
    }, time)
}

async function insertionSort(arr = randomArray){
    for (let i = 1; i < arr.length; i++){
        let current = arr[i]
        var currentEl = document.getElementById(`${i}`)
        for (var j = i - 1; j >= 0 && arr[j] > current; j--){
            let tempEl = document.getElementById(`${j}`)
            changecolors(currentEl, tempEl, 'red', j + 1)
            await sleep(10)
            let swapEl = document.getElementById(`${j + 1}`)
            swapEl.setAttribute('style', `height: ${arr[j]}px`)
            changecolors(currentEl, tempEl, 'cornflowerblue', (j + 1) * 2)
            await sleep(10)
            arr[j + 1] = arr[j]
        }
        let lastSwapEl = document.getElementById(`${j + 1}`)
        changecolors(currentEl, lastSwapEl, 'red', (j + 1)* 3)
        await sleep(10)
        lastSwapEl.setAttribute('style', `height: ${current}px`)
        changecolors(currentEl, lastSwapEl, 'cornflowerblue', (j + 1)* 4)
        await sleep(10)
        arr[j + 1] = current
    }
    arr.forEach((el, index) => {
        const bar = document.getElementById(`${index}`)
        setTimeout(() => {
            bar.style.backgroundColor = 'rgb(113, 20, 206)'
        }, index * 10)
    })

}


function changeArray(){
    randomArray = generateArray(100, 600)
    createBars()
}


function main(){
    createBars()
    bubbleBtn.addEventListener('click', bubbleSort)
    makeArrayBtn.addEventListener('click', changeArray)
}

main()



