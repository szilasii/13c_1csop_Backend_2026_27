
interface IUser {
  id:number,
  name:string,
  email:string,
  age:number
}


const getUser = (): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const success = true
    if (success) {
      setTimeout(() => {
        resolve({id:10,name:"sdfgd",email:"maci@vmi.hu",age:40})
      }, 5000)
    } else {
      reject("Az User adatatok nem kerhetok le")
    }
  })
}

const getAdmin = (ws:number): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const success = true
    if (success) {
      setTimeout(() => {
        resolve({id:10,name:"sdfgd",email:"maci@vmi.hu",age:40})
      }, ws)
    } else {
      reject("Az admin adatatok nem kerhetok le")
    }
  })
}

// getUser().then((name:IUser) => {
//   console.log("Name:",name)
// }).catch((error) => {
//   console.error("Error: ",error)
// })

const user = Promise.resolve({id:10,name:"sdfgd",email:"maci@vmi.hu",age:40})

Promise.all([getUser(),getAdmin(3000)]).then(([user,admin]) => {
    console.log("UserAdat: ",user)
    console.log("adminAdat:", admin)
})

Promise.race([getUser(),getAdmin(2000)]).then((leggyorsabb) => {
    console.log("UserAdat: ",leggyorsabb)
  
})


async function main(): Promise<void> {
  
  try {
    const name:IUser = await getUser()
    console.log(name)
  } catch (error) {
    console.error("Error:",error)
  }
  
  
}

//main()