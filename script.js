const colors=[
"#ff4d4d",
"#4d79ff",
"#33cc33",
"#ffcc00",
"#cc66ff",
"#ff884d",
"#00cccc"
]

let tubes=[]
let selected=null
let level=1
let paused=false

function createLevels(){

const container=document.getElementById("levels")

for(let i=1;i<=20;i++){

const btn=document.createElement("button")
btn.innerText=i
btn.className="levelBtn"

btn.onclick=()=>{
level=i
generateLevel(i)
}

container.appendChild(btn)

}

}

function generateLevel(level){

selected=null

let colorCount=Math.min(3+Math.floor(level/2),colors.length)
let empty=2
let tubeCount=colorCount+empty

let pool=[]

for(let i=0;i<colorCount;i++)
for(let j=0;j<4;j++)
pool.push(colors[i])

pool.sort(()=>Math.random()-.5)

tubes=[]

for(let i=0;i<tubeCount;i++)
tubes.push([])

let index=0

for(let i=0;i<tubeCount-empty;i++)
for(let j=0;j<4;j++)
tubes[i].push(pool[index++])

draw()

}

function draw(){

const game=document.getElementById("game")
game.innerHTML=""

tubes.forEach((tube,i)=>{

const div=document.createElement("div")
div.className="tube"

if(i===selected)
div.classList.add("selected")

div.onclick=()=>tubeClick(i)

tube.forEach(color=>{

const liquid=document.createElement("div")
liquid.className="liquid"
liquid.style.background=color

div.appendChild(liquid)

})

game.appendChild(div)

})

}

function tubeClick(i){

if(paused)return

if(selected===null){

selected=i
draw()
return

}

if(selected===i){

selected=null
draw()
return

}

pour(selected,i)

selected=null
draw()

checkWin()

}

function pour(from,to){

let source=tubes[from]
let target=tubes[to]

if(source.length===0)return
if(target.length===4)return

let color=source[source.length-1]

if(target.length>0 && target[target.length-1]!==color)
return

let count=0

for(let i=source.length-1;i>=0;i--){

if(source[i]===color)
count++
else
break

}

let space=4-target.length
let move=Math.min(space,count)

for(let i=0;i<move;i++)
target.push(source.pop())

document.getElementById("pourSound").play()

}

function checkWin(){

for(let tube of tubes){

if(tube.length===0)continue

if(tube.length!==4)return

if(!tube.every(c=>c===tube[0]))
return

}

setTimeout(()=>{

alert("Level Complete!")

if(level<20){
level++
generateLevel(level)
}

},300)

}

function pauseGame(){

paused=true
document.getElementById("pauseScreen").style.display="flex"

}

function resumeGame(){

paused=false
document.getElementById("pauseScreen").style.display="none"

}

function restartLevel(){
generateLevel(level)
}

createLevels()
generateLevel(1)