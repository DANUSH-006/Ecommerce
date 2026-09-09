const promises = new Promise((resolve, reject) => {
    const error  = true;
    if(error){
        reject('Error, something went wrong');

    }
    resolve('Success : Data fetched successfully');
});

promises.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})


function getData(){
    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
    .then((response)=>{
        const data=  response.json();
        data.then((result)=>{
            console.log(result);
        }).catch((err)=>{
            console.log(err);
        });
    }).catch((err)=>{   
        console.log(err);
    })
}

getData();

// async await 

async function fetchdata(){
    try{
     const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
     const data = await response.json();
     console.log(data);
    } catch(error){
        console.log(error);
    }
}

fetchdata();