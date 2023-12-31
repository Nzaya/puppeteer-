const puppeteer = require('puppeteer');
const schedule = require('node-schedule')

//Sample json
const jsonPatient1 ={
    patientName: 'Jane Doe',
    age: 30
}

//Sample json needing signature
const jsonPatient2 ={
    patientName: 'John Doe',
    age: 40,
    NEEDSIG: true // this json needs signature
}

//function to generate pdf from json data
async function generatePDFfromJSON (jsonPatient){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //html for generating pdf
    const html = `
    <h1>Patient Details</h1>
    <p>Name: ${jsonPatient.patientName}</p>
    <p>Name: ${jsonPatient.age}</p>
    `;

    await page.setContent(html);
    await page.pdf({
        path:`patient_details_${jsonPatient.patientName}.pdf`, 
        format:'A4'})
    await browser.close();    
}
// function to create signature form
function createSignatureFormFromJSON(jsonPatient){
    //html for signature
    const formHTML =`
    <h1>PatientSignature Form</h1>
    <form>
        <label for ="patientName">Patient Name</label>
        <input type="text" id="patientName" value="${jsonPatient.patientName}"disabled>
        <button type="submit">Submit</button>
    </form>
    `;

    console.log(formHTML);
}


//function to determine whether to generate pdf or signature form
async function processJSONPatient(jsonPatient){
    if('NEEDSIG' in jsonPatient){
      await  createSignatureFormFromJSON(jsonPatient);
    }else{
       await generatePDFfromJSON(jsonPatient);
    }
}

//Schedule to run at 4AM that is read the files during the indicated time
schedule.scheduleJob('09 * * * *', async() =>{
    console.log("This is running");

    //Read the files
await Promise.all([
    processJSONPatient(jsonPatient1), //this generates a pdf
processJSONPatient(jsonPatient2) //this generates a form
]);

});



// 0 4 * * *