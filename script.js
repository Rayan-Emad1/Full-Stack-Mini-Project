const pages = {}

pages.base_url = "http://localhost/FullStackMiniProject/"


pages.signin = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let submit=document.getElementById('sub');
  // console.log(email,password)
  submit.addEventListener("click", pages.send_data(email,password));
}


pages.send_data=(email,password)=>{
  // console.log(email,password + " send data")

  const credentials = {
    "email":email,
    "password": password
  }
  const file = JSON.stringify(credentials)

  
  console.log(credentials)
  console.log(file)


  fetch("http://localhost/FullStackMiniProject/signin.php", {
    method: "POST",
    body:file 
  })
    .then(response => response.json())
    .then(data => {
      const status = data.status;
      const name = data.name;
      console.log('hello3')
      pages.handleResponseStatus(status,name);
    })
    .catch(error => console.log('API ERROR ' + error))
}

pages.handleResponseStatus = (status,name) => {
  const passwordInput = document.getElementById('password');
  console.log('hello4')
  switch (status) {
    case 'logged in':
      pages.welcome(name);
      break;

    case 'user not found':
      // Redirect to register.html
      window.location.href = 'register.html';
      break;

    case 'wrong password':
      // Turn password input to red and empty it
      passwordInput.style.borderColor = 'red';
      passwordInput.value = '';
      break;

    default:
      statusMessageElement.innerText = 'Unknown error occurred. Please try again later.';
  }
};


pages.welcome = (name)=>{
  window.location.href = 'welcome.html';
  document.getElementById("greeting").innerHTML = "Hello " + name;

}



// //the below is the script for the articles page
// pages.signup = () => {
//     const articles_url = pages.base_url + "signup.php";
//     pages.print_message("Hello Artciles from JS")
// }


// pages.signin_check = async () => {
//   const index_url = pages.base_url + "signin.php"
//   const response = await pages.getAPI(index_url)
//   const name = response.data[1].name;
//   document.getElementById("title").innerHTML = "Hello " + name;
// }
