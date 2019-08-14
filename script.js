var openTab = (event, tabName) => {
  var i, tabcontent, tablink;
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablink = document.getElementsByClassName("tablink");

  for (i = 0; i < tablink.length; i++) {
    tablink[i].className = tablink[i].className.replace(" active", "");
    tablink[i].style.background = 'white';
    tablink[i].style.color = '#666'
  }
  
  if (tabName == 'News') {
    [...document.getElementsByClassName("container")].map(n => n && n.remove());
    const app = document.getElementById('News');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.append(container);

    var request = new XMLHttpRequest();
    request.open('GET', 'http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news', true);
    request.setRequestHeader('Accept', 'application/json');
    request.onload = () => {
      // Begin accessing JSON data here
      var data = JSON.parse(request.responseText);
      if (request.status >= 200 && request.status < 400) {
        data.forEach(item => {

          const newsCard = document.createElement('div');
          newsCard.setAttribute('class', 'newsCard');

          const h3 = document.createElement('h3');
          h3.textContent = item.titleField;

          const p = document.createElement('p');
          p.textContent = item.descriptionField;
          
          const a = document.createElement('a');
          a.textContent = "Read More"
          a.setAttribute('href', item.linkField)
          a.setAttribute('class', 'readMore')

          const img = document.createElement('img')
          img.setAttribute('src', item.enclosureField.urlField)
          img.setAttribute('class', 'newsImg')

          container.appendChild(newsCard);

          newsCard.appendChild(img)
          newsCard.appendChild(h3);
          newsCard.appendChild(p);
          newsCard.appendChild(a)

        })
      } else {
        console.log('error');
      }
    }

    request.send();
  } else if (tabName == 'Displays') {
    [...document.getElementsByClassName("container")].map(n => n && n.remove());
    const app = document.getElementById('Displays');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.append(container);

    var request = new XMLHttpRequest();
    request.open('GET', 'http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items', true);
    request.setRequestHeader('Accept', 'application/json');
    request.onload = () => {
      var data = JSON.parse(request.responseText);
      if (request.status >= 200 && request.status < 400) {
        data.forEach(item => {

          const displayCard = document.createElement('div');
          displayCard.setAttribute('class', 'displayCard');

          const h3 = document.createElement('h3');
          h3.textContent = item.Title;

          const p = document.createElement('p');
          p.textContent = item.Description;

          const img = document.createElement('img')
          img.setAttribute('src', `http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=${item.ItemId}`)
          img.setAttribute('class', 'newsImg')

          container.appendChild(displayCard);

          displayCard.appendChild(img)
          displayCard.appendChild(h3);
          displayCard.appendChild(p);

        })
      } else {
        console.log('error');
      }
    }
    request.send();
  } else if (tabName == 'Guest Book') {
    [...document.getElementsByClassName("container")].map(n => n && n.remove());
    const app = document.getElementById('Guest Book');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.append(container);

    var request = new XMLHttpRequest();
    request.open('GET', 'http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/htmlcomments', true);
    request.setRequestHeader('Accept', 'application/json');
    request.onload = () => {
      var data = request.responseText
      if (request.status >= 200 && request.status < 400) {

        const comments = document.createElement('div');
        comments.setAttribute('class', 'comments')
        comments.insertAdjacentHTML( 'beforeend', data );

        const postComment = document.createElement('div')
        postComment.setAttribute('class', 'postComment')

        const inputComment = document.createElement('input')
        inputComment.setAttribute('id', 'inputComment')
        inputComment.setAttribute('type', 'text')
        inputComment.setAttribute('placeholder', '💭 Type a comment...')

        const inputName = document.createElement('input')
        inputName.setAttribute('id', 'inputName')
        inputName.setAttribute('type', 'text')
        inputName.setAttribute('placeholder', '💁 Your name...')

        const btnSend = document.createElement('a')
        btnSend.textContent = "Send";
        btnSend.setAttribute('onclick', 'postComment(event)')
        btnSend.setAttribute('id', 'btnSend')

        postComment.appendChild(inputComment)
        postComment.appendChild(inputName)
        postComment.appendChild(btnSend)

        container.appendChild(comments);
        container.appendChild(postComment)

      } else {
        console.log('error');
      }
    }
    request.send();
  }

  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
  event.currentTarget.style.backgroundImage = 'linear-gradient(120deg, #ffc3a0 0%, #ffafbd 100%)'
  event.currentTarget.style.color = 'white'
}

var postComment = (event) => {
  const comment = document.getElementById('inputComment').value
  const name = document.getElementById('inputName').value
  fetch(`http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name=${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  // i know this is bad - makes sure it refreshes when you post
  document.getElementById('gbRefresh').click();
  document.getElementById('gbRefresh').click();
  document.getElementById('gbRefresh').click();
  document.getElementById('gbRefresh').click();
  document.getElementById('gbRefresh').click();
  
}


var refreshSearch = (event, val) => {
  [...document.getElementsByClassName("container")].map(n => n && n.remove());
  const app = document.getElementById('Displays');
  const container = document.createElement('div');
  container.setAttribute('class', 'container');
  app.append(container);

  var request = new XMLHttpRequest();
  request.open('GET', `http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term=${val}`, true);
  request.setRequestHeader('Accept', 'application/json');
  request.onload = () => {
    var data = JSON.parse(request.responseText);
    if (request.status >= 200 && request.status < 400) {
      data.forEach(item => {

        const displayCard = document.createElement('div');
        displayCard.setAttribute('class', 'displayCard');

        const h3 = document.createElement('h3');
        h3.textContent = item.Title;

        const p = document.createElement('p');
        p.textContent = item.Description;

        const img = document.createElement('img')
        img.setAttribute('src', `http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=${item.ItemId}`)
        img.setAttribute('class', 'newsImg')

        container.appendChild(displayCard);

        displayCard.appendChild(img)
        displayCard.appendChild(h3);
        displayCard.appendChild(p);

      })
    } else {
      console.log('error');
    }
  }
  request.send();
}
  
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();