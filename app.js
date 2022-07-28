(function begin(){
    const submit=document.getElementById("submit")
    submit.addEventListener("click",clicking)
})()


function fetchFunc(inp){
    let val=inp.value.trim()
    let val2=val.replace(" ","+")
    return new Promise((resolve,reject)=>{
        fetch(`http://universities.hipolabs.com/search?country=${val2}`)
        .then(result=>result.json())
        .then(result=>{
            if(result.length){
                return resolve(result)
            }else{
                throw new Error("oops")
            }
        })
        .catch(err=>reject(err))
    })
}


function clicking(){
    let errP=document.getElementById("countryP")
    let input=document.getElementById("input")
        fetchFunc(input)
        .then(result=>createDivs(result,input))
        .catch(err => errorFunc(errP))
        

}

let infoDiv=document.getElementById("infoDiv")
function createDivs(result, inp){
   
    let stringified=[]
    let res2=[]

    for(let i=0; i<result.length;i++){
        stringified.push(JSON.stringify(result[i]))
    }
    let uniques=[...new Set(stringified)]
    
    for(let i=0; i<uniques.length;i++){
        res2.push(JSON.parse(uniques[i]))
      }

    infoDiv.innerHTML=""
      

    for(let i=0; i<res2.length; i++ ){
        let d=document.createElement("div")
        let a=document.createElement("a")
        let p1=document.createElement("p")
        let p2=document.createElement("p")
        let p3=document.createElement("p")
        let p4=document.createElement("p")
        d.classList.add("cell")
        d.append(p1,p2,p3,p4,a)
        infoDiv.append(d)
        p1.innerText=`alpha two code : ${res2[i].alpha_two_code}`
        p2.innerText=`country : ${res2[i].country}`
        p3.innerText=`domain : ${res2[i].domains[0]}`
        p4.innerText=`name : ${res2[i].name}`
        a.href=res2[i].web_pages[0]
        a.innerText=res2[i].web_pages[0]
    }
    inp.value=""
}


function errorFunc(text){
   text.innerText="ERROR!"
   infoDiv.innerHTML=""
}

