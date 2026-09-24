
import {getUsers} from "./functions.ts"
  getUsers().then((v) => console.log(v)).catch((e) => console.log("hiba"))
  
try
{ 
  console.log(await getUsers())
}catch {
  console.log("hibak")
}