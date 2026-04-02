

export const write_log = async(directory:string , file:string , line_number:number ,msg:string=" ")=>{
    const backend=import.meta.env.VITE_BACKEND_ADDRESS
    try {
        await fetch(`${backend}/log`,{
            method:'POST' , 
            headers:{'Content-Type' : 'application/json' } , 
            body: JSON.stringify({directory,file, line_number , msg})
        });
    } catch (error) {
        console.log("failed to send log : " + error);

    }
};