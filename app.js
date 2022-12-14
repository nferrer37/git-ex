const clearForm = () => {
    let table = document.getElementById('empTable');
    let rows = table.rows;
    
    resetButtons();
    document.getElementById('empInfo').reset();
    document.getElementById('update').disabled = true;
    document.getElementById('create').disabled = true;
    
    // Reenables create button if file is already read/loaded in
    if(document.getElementById('process').disabled) {
        document.getElementById('create').disabled = false;
    }

    var clearRow = document.getElementById('empTable').rows;

    for(let row of clearRow) {
        row.style.color = 'black';
    }
}

// Clears form on page refresh ***Thanks Borland***
window.onload = () => clearForm();

let currentRow = null;
var empNames = new Array();
var nameChanged = false;
var currentName = [];
var result = [];


// *FUNCTIONALITY* Reads selected file into client interface
function processFile() {

    let table = document.getElementById('empTable');
    let rows = table.rows;

    //get file
    var file = document.getElementById("fileSelect");
     
    // Checking file type extension
    var fileType = file.value.toLowerCase().split('.')[1];

    //check if file is CSV or .Txt
    if (fileType == 'csv') {

        if(rows.length < 1) {
            readCsv(file);
            document.getElementById('write').disabled = false; 
        }
        else {
            for(var i = 0;i < table.rows.length;) {
                table.deleteRow(i);
            }
            readCsv(file);
            document.getElementById('write').disabled = false; 
        }

    }
    else if(fileType == 'txt')
    {
        if(rows.length < 1) {
            readText(file);
            document.getElementById('write').disabled = false;
        }
        else {
            
            for(var i = 0; i < table.rows.length;) {
                table.deleteRow(i);
            }
            readText(file);
            document.getElementById('write').disabled = false;
        }
     

    }
    else {
        if(file.value == "") {
            alert("No file selected. Please select a file and try again")
        }
        else {
            alert("This is not an authorized file type. Please try a CSV or .Txt file!")
        }
    }
    
}

// *FUNCTIONALITY* If the read file is a .CSV file
const readCsv = (readFile) => {
    //check if browser support FileReader
    if (typeof (FileReader) != "undefined") {
        //get table element
         var myTable = document.getElementById("empTable");
 
         //create html5 file reader object
         var reader = new FileReader();
         // call filereader. onload function
         reader.onload = function(e) {
             var content = reader.result;              

              // If file does not contain any content
              if(content.length == 0) {
                console.log("HI")
             }
             else{
             //split csv file using "\n" for new line ( each row)
             var lines = content.split("\n");
 
             //loop all rows
             for (var count = 1; count < lines.length - 1; count++) {
                 //create a tr element
                 var row = document.createElement("tr");
                 //split each row content
                 var rowContent = lines[count].split(",");
 
                 var contentId = rowContent[0];
                 var contentLname = rowContent[1];
                 var contentFname = rowContent[2];
                 var contentBdate = rowContent[3];
                 var contentPhone = rowContent[4];
                 var contentAddress = rowContent[5].substring(1) + "," + rowContent[6] + "," + rowContent[7].slice(0, -1);
                 var contentSocial = rowContent[8];
 
                 // Checking array length for different addresses when editing
                 // console.log(contentAddress.split(',')[0].split(" "))
 
                 // Variable for adding edit and delete functionality to each row
                 var contentAction = "<input type='button' class='edit' id='edit' value='Edit' onclick='editRow(this)'> <input type='button' id='delete' value='Delete' onclick='deleteRow(this)'></td>";
 
             rowArray = [contentId, contentLname, contentFname, contentBdate, contentPhone, contentAddress, contentSocial, Date.now(), "x" /* placeholder for edit/delete buttons*/]
 
                 //loop through all columns of a row
                 for (var i = 0; i < rowArray.length; i++) {
                    //create td element 
                     var cellElement = document.createElement("td");
                     if (count >= 1) {
                         
                         cellElement = document.createElement("td");
                     }
                     //add a row element as a node for table
                     var cellContent = document.createTextNode(rowArray[i]);
                     
                     cellElement.appendChild(cellContent);
                     //append row child
                     row.appendChild(cellElement);
                     
                 }
                 
                 // Adds edit and delete buttons with functionality to each row
                 row.children[8].innerHTML = contentAction;
                 //append table contents
                 myTable.appendChild(row);
             }
            }
        }
        if(readFile.files[0].size >= 1) {
            //call file reader onload
            reader.readAsText(readFile.files[0]);

            document.getElementById('fileSelect').disabled = true;
            document.getElementById('process').disabled = true;
            document.getElementById('create').disabled = false;
        }
        else {
            alert("File selected does not contain any content. Select another file and try again.")
        }
        
    }
    else 
    {
    alert("This browser does not support HTML5.");
    }
}

// *FUNCTIONALITY* If the read file is a .txt file
const readText = (readFile) => {
    //check if browser support FileReader
    if (typeof (FileReader) != "undefined") {
        //get table element
         var myTable = document.getElementById("empTable");
 
         //create html5 file reader object
         var reader = new FileReader();
         // call filereader. onload function
         reader.onload = function(e) {
            var content = reader.result;
             
            // If file does not contain any content
             if(content.length == 0) {
                console.log("HI")
             }
             else{
            //split csv file using "\n" for new line ( each row)
            var lines = content.split("\n");

            //loop all rows
            for (var count = 1; count < lines.length - 1; count++) {
                //create a tr element
                var row = document.createElement("tr");
                //split each row content
                var rowContent = lines[count].split("\t");
                var contentId = rowContent[0];
                var contentLname = rowContent[1];
                var contentFname = rowContent[2];
                var contentBdate = rowContent[3];
                var contentPhone = rowContent[4];
                var contentAddress = rowContent[5]
                var contentSocial = rowContent[6];

                // Checking array length for different addresses when editing
                // console.log(contentAddress.split(',')[0].split(" "))

                // Variable for adding edit and delete functionality to each row
                var contentAction = "<input type='button' class='edit' id='edit' value='Edit' onclick='editRow(this)'> <input type='button' id='delete' value='Delete' onclick='deleteRow(this)'></td>";

            rowArray = [contentId, contentLname, contentFname, contentBdate, contentPhone, contentAddress, contentSocial, Date.now(), "x" /* placeholder for edit/delete buttons*/]

                //loop through all columns of a row
                for (var i = 0; i < rowArray.length; i++) {
                //create td element 
                    var cellElement = document.createElement("td");
                    if (count >= 1) {
                        
                        cellElement = document.createElement("td");
                    }
                    //add a row element as a node for table
                    var cellContent = document.createTextNode(rowArray[i]);
                    
                    cellElement.appendChild(cellContent);
                    //append row child
                    row.appendChild(cellElement);
                    
                }
                // Adds edit and delete buttons with functionality to each row
                row.children[8].innerHTML = contentAction;
                //append table contents
                myTable.appendChild(row);
                }
            }
         }
         if(readFile.files[0].size >= 1) {
            //call file reader onload
           reader.readAsText(readFile.files[0]);
 
           document.getElementById('fileSelect').disabled = true;
           document.getElementById('process').disabled = true;
           document.getElementById('create').disabled = false;
         }
         else {
            alert("File selected does not contain any content. Select another file and try again.")
         }
        }
          
        
         else 
         {
               alert("This browser does not support HTML5.");
         }
}

// *FUNCTIONALITY* Creating new employee
const addEmployee = () => {

    // If the whole form is not empty and the create button is clicked
    if(!emptyFormEntry(document.forms['empInfo']['fname'].value) && !emptyFormEntry(document.forms['empInfo']['lname'].value) && !emptyFormEntry(document.forms['empInfo']['address1'].value) && !emptyFormEntry(document.forms['empInfo']['address2'].value) && !emptyFormEntry(document.forms['empInfo']['address3'].value) && !emptyFormEntry(document.forms['empInfo']['address4'].value) && !emptyFormEntry(document.forms['empInfo']['phoneArea'].value) && !emptyFormEntry(document.forms['empInfo']['phoneThree'].value) && !emptyFormEntry(document.forms['empInfo']['phoneFour'].value) && !emptyFormEntry(document.forms['empInfo']['birthDateMonth'].value) && !emptyFormEntry(document.forms['empInfo']['birthDateDay'].value) && !emptyFormEntry(document.forms['empInfo']['birthDateYear'].value) && !emptyFormEntry(document.forms['empInfo']['social'].value)) {
        
        // Finds the form user inputs
        let firstName = document.forms['empInfo']['fname'].value.charAt(0).toUpperCase() + document.forms['empInfo']['fname'].value.slice(1).toLowerCase();
        while(!textCheck(firstName)) {
            firstName = prompt("First name not in correct format. Please enter only letter characters and try again:")
            firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
        }

        let lastName = document.forms['empInfo']['lname'].value.toUpperCase();
        while(!textCheck(lastName)) {
            lastName = prompt("First name not in correct format. Please enter only letter characters and try again:");
            lastName = lastName.toUpperCase();
        }
        
        // Sets variables for four parts of address
        var addressStreet = document.forms['empInfo']['address1'].value;

        // Street is not in proper format
        while(!streetCheck(addressStreet)) {
            addressStreet = prompt("Street portion of address is not in correct format. Please reenter using example format: ")
            
        }
        // Splits street into array for validation
        var splitAddress = addressStreet.split(' ');
        addressStreet = validateStreet(splitAddress);

        var addressCity = document.forms['empInfo']['address2'].value.charAt(0).toUpperCase() + document.forms['empInfo']['address2'].value.slice(1).toLowerCase();;
        while(!textCheck(addressCity)) {
            addressCity = prompt("City name format is incorrect. Please enter correct city name and try again: ")
            addressCity = addressCity[0].toUpperCase() + addressCity.slice(1).toLowerCase();
        }
        
        var addressState = document.forms['empInfo']['address3'].value.toUpperCase();
        while(!textCheck(addressState)) {
            addressState = prompt("State abbreviation format is incorrect. Please enter correct city name and try again: ").toUpperCase()
        }
        if(addressState.length > 2) {
                addressState = addressState.slice(0, 2);
            }
        
        var addressZip = document.forms['empInfo']['address4'].value;
        while(!fiveNumberCheck(addressZip) || !numberValidation(addressZip)) {
            addressZip = prompt("Zip code was invalid. Please enter a valid five digit number: ")
        }
        if(addressZip.length > 5) {
                addressZip = addressZip.slice(0, 5);
        }

        // Sets variables for three parts of phone number
        var phoneArea = document.forms['empInfo']['phoneArea'].value;
    
        // If number does not match 3 digits or is not a number
        while(!threeNumberCheck(phoneArea) || !numberValidation(phoneArea)) {
            phoneArea = prompt("User input was invalid. Please enter a valid three digit number: ")
        }
        if(phoneArea.length > 3) {
            phoneArea = phoneArea.slice(0, 3);
        }

        var phoneThree = document.forms['empInfo']['phoneThree'].value;
        while(!threeNumberCheck(phoneThree) || !numberValidation(phoneThree)) {
            phoneThree = prompt("User input was invalid. Please enter a valid three digit number: ")
        }
        if(phoneThree.length > 3) {
            phoneThree = phoneThree.slice(0, 3);
        }

        var phoneFour = document.forms['empInfo']['phoneFour'].value;
        while(!fourNumberCheck(phoneFour) || !numberValidation(phoneFour)) {
            phoneFour = prompt("User input was invalid. Please enter a valid four digit number: ")
        }
        if(phoneFour.length > 4) {
            phoneFour = phoneFour.slice(0, 4);
        }
        
        // Sets variables for three parts of birthdate
        var birthDateMonth = checkMonth(document.forms['empInfo']['birthDateMonth'].value);
        var birthDateDay = checkDay(document.forms['empInfo']['birthDateDay'].value);
        var birthDateYear = document.forms['empInfo']['birthDateYear'].value;

        let social = document.forms['empInfo']['social'].value;
        while(!socialCheck(social) || !numberValidation(social)) {
            social = prompt("SSN is not in correct format. Please enter correct SSN to continue: ")
            if(social.length > 9) {
                social = social.slice(0, 9);
            }
        }
        // Checking existing ssns
        social = verifySocial(social);

        // Generates random ID number for new employees
        let empId = randomEmpId(1, 99999);
        let address = addressStreet + ", " + addressCity + ", " + addressState + " " + addressZip
        let phone = "(" + phoneArea + ") " + phoneThree + "-" + phoneFour;
        // Checking existing phone numbers
        phone = verifyPhone(phone);
        let birthDate = birthDateMonth + "/" + birthDateDay + "/" + birthDateYear;     
        let dateAdded = Date.now();

        // Finds table element
        let thisTable = document.getElementById('empTable')
        // Inserts new row into table at end of table
        var row = thisTable.insertRow(-1);

        // New row is given cells for each heading
        var cellEmpid = row.insertCell(0);
        var cellLname = row.insertCell(1);
        var cellFname = row.insertCell(2);
        var cellBirthdate = row.insertCell(3);
        var cellNumber = row.insertCell(4);
        var cellAddress = row.insertCell(5);
        var cellSocial = row.insertCell(6);
        var cellDate = row.insertCell(7)
        var cellAction = row.insertCell(8);

        // Assigning values for each cell
        cellFname.innerHTML = firstName;
        cellLname.innerHTML = lastName;
        cellEmpid.innerHTML = empId;
        cellAddress.innerHTML = address;
        cellNumber.innerHTML = phone;
        cellBirthdate.innerHTML = birthDate;
        cellSocial.innerHTML = social;
        cellDate.innerHTML = dateAdded;
        cellAction.innerHTML = "<input type='button' class='edit' id='edit' value='Edit' onclick='editRow(this)'> <input type='button' id='delete' value='Delete' onclick='deleteRow(this)'></td>";

        clearForm();
    }
    else {
        alert("Not all form entries were completed! Please ensure all fields are completed and try again!")
    }
    
    
}

// *DATA VALIDATION* Checking three digit area code and digits of phone number
const threeNumberCheck = (numberCheck) => {
    const regex = /(\d{3})/
    var result = regex.test(numberCheck)
    return result;
}

// *DATA VALIDATION* Checking last four digits of phone number
const fourNumberCheck = (numberCheck) => {
    const regex = /(\d{4})/
    var result = regex.test(numberCheck)
    return result;
}

// *DATA VALIDATION* Checking five digits of address zip code
const fiveNumberCheck = (numberCheck) => {
    const regex = /(\d{5})/
    var result = regex.test(numberCheck)
    return result;
}

// *DATA VALIDATION* Checking nine digits of ssn
const socialCheck = (social) => {
    const regex = /(\d{9})/
    var result = regex.test(social)
    return result;
}

// *DATA VALIDATION* Checking street address format of 'address number/street name/street suffix'
const streetCheck = (street) => {
    const regex = /(\d+) (\w+[ ,\w]+)/
    var result = regex.test(street)
    return result;
}

// *DATA VALIDATION* When streetCheck function returns false
const validateStreet = (splitStreet) => {

        console.log(splitStreet);
        var validatedStreet = "";
     // For each index of split address array
     for(i = 0; i < splitStreet.length; i++) {
        // Street Number plus concat space
        if(i == 0){
            validatedStreet = splitStreet[i] + ' ';

        }
        // Street name/title up to last word before suffix plus concat space
        else if(i > 0 && i <= splitStreet.length - 2) {
            validatedStreet += splitStreet[i].charAt(0).toUpperCase() + splitStreet[i].slice(1).toLowerCase() + ' ';
            console.log(validatedStreet)

        }
        // Street suffix
        else if(i = splitStreet.length - 1) {

            while(splitStreet[i].length < 2) {
                splitStreet[i] = prompt("Street Suffix did not contain enough characters. Please enter a proper street suffix: ")
            }
            if(splitStreet[i].length == 2) {
                validatedStreet += splitStreet[i].charAt(0).toUpperCase() + splitStreet[i].charAt(1).toLowerCase();
                console.log(validatedStreet)

            }
            else if(splitStreet[i].length >= 3 && splitStreet[i].length <= 5) {
                validatedStreet += splitStreet[i].charAt(0).toUpperCase() + splitStreet[i].slice(1, splitStreet[i].length).toLowerCase();
            console.log(validatedStreet)
            }
            else {
                while(splitStreet[i].length > 5) {
                    splitStreet[i] = prompt("Street Suffix contained too many characters. Please enter a proper street suffix: ")
                }
            }

        }

    }
    return validatedStreet;
}

// *DATA VALIDATION* Verifies user input has letter characters only
const textCheck = (text) => {
    const regex = /[a-zA-Z]+/
    var result = regex.test(text)
    return result;
}
// *DATA VALIDATION* Called when we click on the submit button
function numberValidation(inputField) {

    var result = true;

    // isNan() function check whether passed variable is number or not
    if (isNaN(inputField)) {

        result = false;

    } 

    return result
}

// *DATA VALIDATION* Checks for empty imput values via formBox
const emptyFormEntry = (formBox) => {
    var validInput = true
    if(formBox == "") {
        validInput = true;
    }
    else {
        validInput = false;
    }
    return validInput;
}

// *FUNCTIONALITY* Editing selected employee
const editRow = (x) => {

    // Disables 'Create'/'Edit' buttons and enables 'Update' button
    var editButtons = document.getElementsByClassName('edit');
    for(let button of editButtons)
    {
        button.disabled = true;
    }
    document.getElementById('create').disabled = true;
    document.getElementById('update').disabled = false;

    // Disables ssn input box so that it cannot be edited
    document.forms['empInfo']['social'].disabled = true;

    // Takes row index argument
    let selectedRow = x.parentNode.parentNode.rowIndex;
   
    // Grabs current row table
    currentRow = document.getElementById('empTable').rows[selectedRow - 1];

    currentRow.classList.add("editingRow");

    // Adds row cells to new array
    var rowArray = new Array;
    for(let child of currentRow.children) {
        rowArray.push(child.innerText);
    }

    // Each index of array represents each column of table
    let empId = rowArray[0].valueOf();
    let lastName = rowArray[1].valueOf();
    let firstName = rowArray[2].valueOf();

    // For email validation
    currentName = [firstName, lastName];
    
    let birthDate = rowArray[3].valueOf();
    // Gets birthdate values by splitting column by forward slash
    var birthArray = birthDate.split('/');

    // Pulls phone value from table
    let phone = rowArray[4].valueOf();
    // Splits phone value at dash
    var phoneArray = phone.split('-')
    var phoneDigitArray = phoneArray[0].split(' ');
    // Gets phone zip code from slicing off parenthesis from index 0 of phoneDigitArray
    var phoneArea = phoneDigitArray[0].slice(1, 4);
    // Gets last four digits of phone number
    var phoneFour = phoneArray[1];
    // Gets middle three digits of phone number
    var phoneThree = phoneDigitArray[1];

    // Gets address and splits based off of capital letters
    let address = rowArray[5].split(',');
    
    // Cleans up address split for state letters and zip code
    let address1 = address[address.length - 1].trim().split(' ');

    let social = rowArray[6].valueOf();

   
    // Form values become entered based on the row selected
    document.forms['empInfo']['empId'].value = empId;
    document.forms['empInfo']['lname'].value = lastName;
    document.forms['empInfo']['fname'].value = firstName;

    document.forms['empInfo']['birthDateMonth'].value = birthArray[0];
    document.forms['empInfo']['birthDateDay'].value = birthArray[1];
    document.forms['empInfo']['birthDateYear'].value = birthArray[2];

    document.forms['empInfo']['phoneArea'].value = phoneArea;
    document.forms['empInfo']['phoneThree'].value = phoneThree;
    document.forms['empInfo']['phoneFour'].value = phoneFour;

    // Variable for checking length of address before city name
    var addressCheck = currentRow.children[5].innerText.split(',')[0].split(" ").length;
    // Variable for checking if city has two or more words
    var cityCheck = rowArray[5].split(',')[1].trim().split(' ')
    /* Each address within the csv file are different lengths. This code accomodates for the different lengths */
    // Length of address sections before city name is 5
    if(addressCheck == 5) {

        // First box of address is number, street name
        document.forms['empInfo']['address1'].value = address[0];
        // Second address box is city name
        if(cityCheck.length == 1) {

            document.forms['empInfo']['address2'].value = address[1].trim();
        }
        else if(cityCheck.length >= 2) {
            let newCity = ""
            for(i = 0; i < cityCheck.length; i++) { 
                newCity += cityCheck[i] + " ";
            }
            document.forms['empInfo']['address2'].value += newCity.trim();
        }
        
        // Third is state abbreviation
        document.forms['empInfo']['address3'].value = address1[0];
    }
    // Length of address sections before city name is 4
    else if(addressCheck == 4) {

        document.forms['empInfo']['address1'].value = address[0];
        // Second address box is city name
        if(cityCheck.length == 1) {
            document.forms['empInfo']['address2'].value = address[1].trim();;
        }
        else if(cityCheck.length >= 2) {
            let newCity = ""
            for(i = 0; i < cityCheck.length; i++) { 
                newCity += cityCheck[i] + " ";
            }
            document.forms['empInfo']['address2'].value += newCity.trim();
        }
        // Third is state abbreviation
        document.forms['empInfo']['address3'].value = address1[0];
    
    }
    // Length of address sections before city name is 3
    else if(addressCheck == 3) {

        document.forms['empInfo']['address1'].value = address[0];
        // Second address box is city name
        if(cityCheck.length == 1) {
            document.forms['empInfo']['address2'].value = address[1].trim();
        }
        else if(cityCheck.length >= 2) {
            let newCity = ""
            for(i = 0; i < cityCheck.length; i++) { 
                newCity += cityCheck[i] + " ";
            }
            document.forms['empInfo']['address2'].value += newCity.trim();
        }
        // Third is state abbreviation
        document.forms['empInfo']['address3'].value = address1[0];
    } 

    // Last is zip code
    document.forms['empInfo']['address4'].value = address1[1];

    document.forms['empInfo']['social'].value = social;

    var names = emailNames() 
    names = validateEmail(names)

    // Email is firstInitial.Lastname@email.com
    document.forms['empInfo']['email'].value = names[selectedRow-1][0] /*firstName.charAt().toLowerCase() + "." + lastName.toLowerCase()*/ + "@email.com";
    
    // Sends current row and current row in array format to displayEmployee function
    displayEmployee(rowArray, currentRow);
}

// *FUNCTIONALITY* Saving changes for edited employee
const updateRow = () => {
    
    // Reenables ssn input box for new employees
    document.forms['empInfo']['social'].disabled = false;

    // Reenables create button
    document.getElementById('create').disabled = false;

    // Sets variables for three parts of phone number
    var phoneArea = document.forms['empInfo']['phoneArea'].value;
    var phoneThree = document.forms['empInfo']['phoneThree'].value;
    var phoneFour = document.forms['empInfo']['phoneFour'].value;

    // Sets variables for three parts of birthdate
    var birthDateMonth = checkMonth(document.forms['empInfo']['birthDateMonth'].value);
    var birthDateDay = checkDay(document.forms['empInfo']['birthDateDay'].value);
    var birthDateYear = document.forms['empInfo']['birthDateYear'].value;

    // Address1 method prevent extra commas from being added onto the address string
    var address1 = document.forms['empInfo']['address1'].value.replace(',', '').trim()
    var address2 = document.forms['empInfo']['address2'].value 
    var address3 = document.forms['empInfo']['address3'].value 
    var address4 = document.forms['empInfo']['address4'].value
    var firstName = document.forms['empInfo']['fname'].value
    // Grabs all rows
    var tableBody = document.getElementById('empTable').rows;

    // Goes through each row to determine which row is the current row
    for(let cell of tableBody) {
        if(cell.children[0].innerText == document.forms['empInfo']['empId'].value) {
            cell.children[1].innerHTML = document.forms['empInfo']['lname'].value.toUpperCase();
            cell.children[2].innerHTML = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            cell.children[3].innerHTML = birthDateMonth + "/" + birthDateDay + "/" + birthDateYear;
            cell.children[4].innerHTML = "(" + phoneArea + ") " + phoneThree + "-" + phoneFour;
            cell.children[5].innerHTML = address1 + ", " + address2 + ", " + address3 + " " + address4;
            cell.children[6].innerHTML = document.forms['empInfo']['social'].value;

            var firstName = cell.children[2].innerHTML
            var lastName = cell.children[1].innerHTML

            // If employee's name changed
            if(currentName[0] != firstName || currentName[1] != lastName) {
  
                nameChanged = true;
                cell.children[7].innerHTML = Date.now();
                
            }

            // Resets row color back to black to 'deselect'
            cell.classList.remove("editingRow");
        }
    }

    // Re-sorts table by oldest dateAdded number first
    sortTable()

    // Reenables all edit buttons
    var editButtons = document.getElementsByClassName('edit');
    for(let button of editButtons)
    {
        button.disabled = false;
    }
    
    

    // Disables update button
    document.getElementById('update').disabled = true;
    clearForm();
}

// Sorts table by ascending dateAdded number
const sortTable = () => {
    var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("empTable");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;

    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 0; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[7];
      y = rows[i + 1].getElementsByTagName("TD")[7];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// *FUNCTIONALITY* Deletes clicked row
const deleteRow = (x) => {

    var tableRow = document.getElementById('empTable').rows;

    var deletedRowIndex = x.parentNode.parentNode.rowIndex;
    var deletedRow = document.getElementById('empTable');
    deletedRow.deleteRow(deletedRowIndex - 1);
    // employeeCount = document.getElementById('empTable').rows;
    clearForm();

    if(tableRow.length < 1) {
        alert("Table does not contain any data! Please add a new employee or load in another file")
        document.getElementById('process').disabled = false;
        document.getElementById('fileSelect').disabled = false;
        document.getElementById('write').disabled = true;

    }
}


// *FUNCTIONALITY*
const resetButtons = () => {
    document.getElementById('create').disabled = false;
    document.getElementById('resetButton').disabled = true;
    document.getElementById('write').disabled = true;

    // Reenables all edit buttons
    var editButtons = document.getElementsByClassName('edit');
    for(let button of editButtons)
    {
        button.disabled = false;
    }
    if(checkEmptyForm()) {
        document.getElementById('update').disabled = true;
    }
    else {
        document.getElementById('update').disabled = false;
    }
}

// *FUNCTIONALITY* Passed row array argument from editRow() function
const displayEmployee = (row, thisRow) => {

    if(row[0] == document.forms['empInfo']['empId'].value) {
            thisRow.style.color = "red"
        }

}

// *DATA VALIDATION* Checks month digit of birthdate
const checkMonth = (month) => {

    var correctMonth = month;
    // if single digit month
    if(month.length == 1)
    {
        if(month == 0)
        {
            alert('Month digit cannot be zero!');
            correctMonth = prompt('Enter a correct digit for the month');
        }
    }
    // if double digit month
    else if(month.length > 1)
    {
        
        if(month[0] != 1 && month[0] != 0)
        {
            alert('If two digit month, first digit must be 1!')
            correctMonth = prompt('Enter a correct digit for the month');
        }
        else if(parseInt(month[0]) == 0)
        {
            correctMonth = month.slice(1);
        }
        else if(parseInt(month) > 12)
        {
            alert('Month digit cannot be greater than 12')
            correctMonth = prompt('Enter a correct digit for the month');
        }
        
        
    }
    return correctMonth;
}

// *DATA VALIDATION* Checks day digit of birthdate
const checkDay = (day) => {

    var correctDay = day;
    // Employee birthday month
    var month = document.forms['empInfo']['birthDateMonth'].value;
    var year = document.forms['empInfo']['birthDateYear'].value;

    // if single digit day
    if(day.length == 1)
    {
        while(day == 0)
        {
            alert('Day digit cannot be zero!');
            correctDay = prompt('Enter a correct digit for the day');
        }
    }
    // if double digit day
    else if(day.length > 1)
    {
        // Checking if first digit is not 3 or less
        while(day[0] != 0 && day[0] != 1 && day[0] != 2 && day[0] != 3)
        {
            alert('If two digit day, first digit must be 1, 2, or 3!');
            correctDay = prompt('Enter a correct digit for the day');
        }
        // Checking if day is greater than 31
        while(parseInt(day) > 31)
        {
            alert('There cannot be more than 31 days in a month!');
            correctDay = prompt('Enter a correct digit for the day');

        }
        // If birthdate month has 30 days
        if(parseInt(month) == 4 || parseInt(month) == 6 || parseInt(month) == 9 || parseInt(month) == 11)
        {
            while(parseInt(day) > 30){
                alert('This month cannot have more than 30 days');
                correctDay = prompt('Enter a correct digit for the day');
            }
          
        }
        // If the month is February
        else if(parseInt(month) == 2)
        {
            if(checkLeapYear(year))
            {
                if(parseInt(day) > 29) {
                    alert('This month cannot have more than 29 days');
                    correctDay = prompt('Enter a correct digit for the day');

                    // Correcting user inputs
                    while(correctDay > 29) {
                        alert('This month cannot have more than 29 days');
                        correctDay = prompt('Enter a correct digit for the day');
                    }
                }
            }
            else {
                if(parseInt(day) > 28) {
                    alert('This month cannot have more than 28 days');
                    correctDay = prompt('Enter a correct digit for the day');

                    // Correcting user inputs
                    while(correctDay > 28) {
                        alert('This month cannot have more than 28 days');
                        correctDay = prompt('Enter a correct digit for the day');
                    }
                }
            }
        }
        // If user inputs 0 as first digit of two digit day, auto slice off the 0
        else if(parseInt(day[0]) == 0)
        {
            correctDay = day.slice(1);
        }
    }
    return correctDay;

}

// *DATA VALIDATION* program to check leap year
const checkLeapYear = (year) => {
    var checkLeap = true
    //three conditions to find out the leap year
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        checkLeap = true;
        
    } else {
        checkLeap = false;
    }
    return checkLeap;
}

//  *DATA VALIDATION* Checks if form values are empty
const checkEmptyForm = () => {

    // If form is empty/new, return true
    if(document.forms['empInfo']['empId'].value == "" &&
    document.forms['empInfo']['lname'].value == "" &&
    document.forms['empInfo']['fname'].value == "" &&
    document.forms['empInfo']['phoneArea'].value == "" &&
    document.forms['empInfo']['phoneThree'].value == "" &&
    document.forms['empInfo']['phoneFour'].value == "" &&
    document.forms['empInfo']['address1'].value == "" &&
    document.forms['empInfo']['address2'].value == "" &&
    document.forms['empInfo']['address3'].value == "" &&
    document.forms['empInfo']['address4'].value == "" &&
    document.forms['empInfo']['social'].value == "")
    {
        return true;
    }
    // If user added some input, return false
    else
    {
        return false;
    }

}

// *FUNCTIONALITY* Enables reset button if any form input is clicked on
const enableReset = () => {
    document.getElementById('resetButton').disabled = false;
}

// *FUNCTIONALITY* Disables reset button based on certain factors
const disableReset = () => {
    // If form is empty, disable reset button
    if(checkEmptyForm()) {
        document.getElementById('resetButton').disabled = true;
    }
    // If form has user input, do not disable reset button
    else {
        document.getElementById('resetButton').disabled = false;
    }
    
}

// *FUNCTIONALITY* function for new employee's ID number
const randomEmpId = (min, max) => {

    // New employee ID randomized
    var newEmpid = Math.floor(Math.random() * (max - min + 1) ) + min;

    // Grabs all rows
    var tableBody = document.getElementById('empTable').rows;
    var arrayEmpid = [];
    // Adding current employee IDs to array to check against
    for(let cell of tableBody) {
        
        arrayEmpid.push(cell.children[0].innerText);
        }

    // Checking new employee ID against current employees
    for(let id of arrayEmpid) {
        if(newEmpid == id) {
            newEmpid = Math.floor(Math.random() * (max - min + 1) ) + min
        }
    }
    return newEmpid;

}

// *DATA VALIDATION*
const verifySocial = (ssn) => {

    // Grabs all rows
    var tableBody = document.getElementById('empTable').rows;
    var arraySocial = [];
    // Adding current employee SSNs to array to check against
    for(let cell of tableBody) {
        arraySocial.push(cell.children[6].innerText);
        }

    // Checking new employee ssn against current employees ssns
    for(i = 0; i < arraySocial.length; i++) {

        while(ssn == parseInt(arraySocial[i])) {
            console.log('twilight zone');
            ssn = prompt('That SSN already exists! Please contact your local SSN office! Enter another SSN: ');
        }
    }
    if(ssn.length > 9) {
        ssn = ssn.slice(0, 9);
    }
    return ssn;

}

// *DATA VALIDATION*
const verifyPhone = (phoneNumber) => {

    // Grabs all rows
    var tableBody = document.getElementById('empTable').rows;
    var arrayPhone = [];
    // Adding current employee SSNs to array to check against
    for(let cell of tableBody) {
        arrayPhone.push(cell.children[4].innerText);
        }

    // Checking phone numbers against current employees phone numbers
    for(i = 0; i < arrayPhone.length; i++) {

        while(phoneNumber == arrayPhone[i]) {
            console.log('twilight zone')

            alert('That phone number already exists! Enter another phone number');

            var phoneArea = prompt('Enter a three digit number for the phone area code: ').slice(0, 3);
            document.forms['empInfo']['phoneArea'].value = phoneArea
            var phoneThree = prompt('Enter a three digit number for the next three digits: ').slice(0, 3);
            document.forms['empInfo']['phoneThree'].value = phoneThree
            var phoneFour = prompt('Enter a four digit number for the last four digits: ').slice(0, 4);
            document.forms['empInfo']['phoneFour'].value = phoneFour
            
            phoneNumber = "(" + phoneArea + ") " + phoneThree + "-" + phoneFour;
            console.log(phoneNumber)
        }
    }

    return phoneNumber;

}

// Provides array of names for email validation
const emailNames = () => {

    // Grabs all rows
    var tableBody = document.getElementById('empTable').rows;

    if(empNames.length > 0) {
        empNames = []
    }
    
    // Adding current employee SSNs to array to check against
    for(let cell of tableBody) {
        empNames.push([cell.children[2].innerText.charAt(0).toLowerCase() + "." + cell.children[1].innerText.toLowerCase(), cell.children[7].innerText]);
    }

    return empNames;

}

// *DATA VALIDATION* Updates names based on duplicate firstinitial.lastname for email addresses
const validateEmail = (names) => {

    // Store the frequency of strings
    var empArray = [];
    var validDuplicates = []
    var dupTrue = false;

    // names.sort(function(a,b) {
    //     return a[1]-b[1]
    // })

    // Stores names object as an array of names
    for (i = 0; i < names.length; i++) {
    empArray.push(names[i][0])
    }
    // console.log("Array of names: ", empArray)

    // Filters array for only duplicate names
    result = empArray.filter((element, index) => {

        return empArray.indexOf(element) !== index;
    })

    // Validates the filtered duplicate names
    validDuplicates = result.filter((element, index) => {

        return result.indexOf(element) === index;
    })

    var nameString = "" 
    var duplicateIndexes = []
    var emailNumber;

    // If there is at least one duplicate name
    if(validDuplicates.length > 0) {

        // For each array value of duplicate names
        for(a = 0; a < validDuplicates.length; a++) {

            // For each name in names array
            for(i = 0; i < empArray.length; i++) {

                nameString = empArray[i]

                // If name at i index in names array is the name from the duplicate array, push the index of that name to index array
                if(nameString === validDuplicates[a]) {
                    duplicateIndexes.push(i)
                }

            } 
            
            // For every index value after the first iteration, duplicate emails have numbers added to end of name
            for(b = 1; b < duplicateIndexes.length; b++) {
                var index = duplicateIndexes[b]
                console.log("This is the index: ", index)
                emailNumber = b
                console.log("This is the iteration number: ", emailNumber)
                names[index][0] = names[index][0] + emailNumber
            
            }
            duplicateIndexes = []
        }
        
    }
    
    return names;
}



// *FUNCTIONALITY* Searching/filtering for employees by ID number
const searchEmp = () => {
    var input, filter, tbody, tr, a, i, txtValue;
    input = document.getElementById('empSearch');
    filter = input.value.toUpperCase();
    tbody = document.getElementById('empTable');
    tr = tbody.getElementsByTagName("tr");

    var searchValue = input.value;
    console.log(searchValue[0])
    for(i = 0; i < searchValue.length; i++) {
         if(!searchValue[i].match(/^\d+/))
        {
        alert("Please only enter numeric characters for employee ID! (Allowed input:0-9)")
        console.log(searchValue[i])
        input.value = searchValue.slice(0, (i))
        
        }
    }
   

    for (i = 0; i < tr.length; i++) {
        cellValue = tr[i].children[0];
        txtValue = cellValue.textContent || cellValue.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

// *FUNCTIONALITY* Writes rows of table data to database. Will overwrite previously written data
const writeData = () => {

    var finalString = dataToUse(); 

    fetch("http://localhost:8080/api",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
        },
        method: "POST",
        
        body: JSON.stringify({name: finalString})


    })
    .then((res) =>{ console.log("Got it!") })
    .then((res) => { alert('Table data has been written. Your database file has been saved!')})
    .catch((res) => { console.log("What...why?")} )
}


// *FUNCTIONALITY* Reads data from database
const readDatabase = () => {
    
    var table = document.getElementById('empTable')
    var tableRow = table.rows;
    var confirmFetch = "Are you sure you wish to send this request?";

    if(tableRow.length < 1) {
        
        if (confirm(confirmFetch) == true)  {
            readCall();

        }
        
    }
    else {
        if (confirm(confirmFetch) == true)  {
            table.innerHTML = "";
            readCall();
        }
        
    }
    document.getElementById('write').disabled = false;
    document.getElementById('fileSelect').disabled = false;
    document.getElementById('process').disabled = false;

}

// Database 'read' fetch call
const readCall = () => {

    fetch("http://localhost:8080/database",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
        },
        method: "POST",
        
        // body: JSON.stringify({name: finalString})


    })
    .then((res) =>{ return res.json()})
    .then(function(json){
        database_function(json);
    })
    .then((res) =>{ alert('Database has been read successfully!') })
    .catch((res) => { console.log("What...why?")} )
}

// *FUNCTIONALITY* Takes data from database and stores it in client-side table
const database_function = (data) => {
    var databaseData = data.split('?')
    var capitalFirst = "";

    var table = document.getElementById('empTable') 
   

    for(i = 0; i < databaseData.length - 1; i++) { 
        var row = table.insertRow(-1)
        row.innerHTML = databaseData[i] 
    }
    
    // Capitalize first names
    for(i = 0; i < table.rows.length; i++) { 
        capitalFirst = table.rows[i].cells[2].innerText;
        capitalFirst = capitalFirst.charAt(0).toUpperCase() + capitalFirst.slice(1).toLowerCase()
        table.rows[i].cells[2].innerText = capitalFirst;
    }

    document.getElementById('fileSelect').disabled = false;
    document.getElementById('process').disabled = false; 
    document.getElementById('write').disabled = false; 

}

// Compiles table data for user to send to database
const dataToUse = () => {

    var tableRow = document.getElementById('empTable').rows;
    var tableRows = "";

    if(tableRow.length < 1) {
        alert("Table does not contain any rows. Please populate table and try again")
        document.getElementById('process').disabled = false;
        document.getElementById('fileSelect').disabled = false;
    }
    else {
        var finalString = "";

        // Gives user one last opportunity to confirm the request they are trying to send
        var confirmFetch = "Are you sure you wish to send this request?";
        if (confirm(confirmFetch) == true) {
        
    
        // Fix this *******************************
        // Adds each row into string variable and adds new line command to break the end of the row
        for(i = 0; i < tableRow.length; i++) {
            tableRows = tableRow[i]
            tableRows.cells[1].innerText = tableRows.cells[1].innerText.toLowerCase()
            tableRows.cells[2].innerText = tableRows.cells[2].innerText.toLowerCase()
            finalString += tableRow[i].innerText + '\n';
            console.log(tableRow[i])

            // Clears file selector
            document.getElementById("fileSelect").value = null
        }

        for(i = 0; i < tableRow.length; i++) {
            tableRows = tableRow[i]
            tableRows.cells[1].innerText = tableRows.cells[1].innerText.toUpperCase()
            var firstName = tableRows.cells[2].innerText
            firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
        }

        return finalString;
        }
    }
}