document.getElementById("app").innerHTML = "parent"

const separator = '/'
import("."+separator+"child").then(res=>{
    console.log(res)
})

import("childApp/module").then(res=>{
    console.log(res)
})

import("childApp"+separator+"module").then(res=>{
    console.log(res)
})

