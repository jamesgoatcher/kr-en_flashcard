/*******************************
*** http://jamesgoatcher.com ***
*******************************/

// TO DO:
// - Local Storage
// - Randomize
// - Class stays applied

//Local Storage
localStorage.setItem('flashcards', JSON.stringify(data));
console.log(localStorage);

//Global Booleans
var showSavedBool  = false,
	savedWordsPage = false,
	savedWordsArr  = [];

//Global Elements
var reverse   = document.getElementById('reverse'),
	reset     = document.getElementById('reset'),
	saved     = document.getElementById('saved'),
	main 	  = document.getElementById('main'),
	parent    = document.getElementById('parent'),
	toTop     = document.getElementById('to_top');

//Functions
//Create the cards dynamically
var createCards = function () {
	for (var i = 0; i < data.length; i++) {
		var tempCard = document.createElement('div');
			tempCard.setAttribute('class', 'card');
			tempCard.setAttribute('data-word', i);
			tempCard.addEventListener('click', changeLang);
			var tempContentEn = document.createElement('div');
				tempContentEn.setAttribute('class', 'contentEn');
				tempContentEn.setAttribute('data-en', i);
				tempContentEn.innerHTML = data[i].english;
			var tempContentKr = document.createElement('div');
				tempContentKr.setAttribute('class', 'contentKr');
				tempContentKr.setAttribute('data-kr', i);
				tempContentKr.innerHTML = data[i].korean;
			var tempSaved = document.createElement('div');
				tempSaved.setAttribute('class', 'word_saved');
				tempSaved.setAttribute('data-saved', i);
				tempSaved.addEventListener('click', saveWord);

		parent.appendChild(tempCard);

		tempCard.appendChild(tempContentEn);
		tempCard.appendChild(tempContentKr);
		tempCard.appendChild(tempSaved);
	}
};

//Switch from EN to KR
var changeLang = function (e) {
	var elem = e.currentTarget,
		dataValue = elem.getAttribute('data-word'),
		elemEn = document.querySelector('div[data-en="' + dataValue +'"]'),
		elemKr = document.querySelector('div[data-kr="' + dataValue +'"]');

	if (data[dataValue].boolean == false) {
		elemEn.classList.add('hide');
		elemKr.classList.add('active');
		data[dataValue].boolean = true;
	} else {
		elemEn.classList.remove('hide');
		elemKr.classList.remove('active');
		data[dataValue].boolean = false;
	}
};

//Button to reverse all cards languages
var reverseLanguages = function () {
	for (var i = 0; i < data.length; i++) {
		var tempCardEn = document.getElementsByClassName('contentEn')[i];
		var tempCardKr = document.getElementsByClassName('contentKr')[i];

		if (data[i].boolean == false) {
			reverse.innerHTML = 'English to Korean';
			tempCardEn.classList.add('hide');
			tempCardKr.classList.add('active');
			data[i].boolean = true;
		} else {
			reverse.innerHTML = 'Korean to English';
			tempCardEn.classList.remove('hide');
			tempCardKr.classList.remove('active');
			data[i].boolean = false;
		}
	}
};

//Reset all cards to initial EN language and clear saved cards
var resetLanguages = function () {
	if (savedWordsPage == true) {
		for (var i = 0; i < savedWordsArr.length; i++) {
			var tempCardEn = document.getElementsByClassName('contentEn')[i],
				tempCardKr = document.getElementsByClassName('contentKr')[i];

			tempCardEn.classList.remove('hide');
			tempCardKr.classList.remove('active');
			data[i].boolean = false;
			data[i].saved   = false;
		}
	} else {
		for (var i = 0; i < data.length; i++) {
			var tempCardEn = document.getElementsByClassName('contentEn')[i],
				tempCardKr = document.getElementsByClassName('contentKr')[i];

			tempCardEn.classList.remove('hide');
			tempCardKr.classList.remove('active');
			data[i].boolean = false;
			data[i].saved   = false;
		}
	}

	window.location.reload();
};

//Change the saved status of the word
var saveWord = function (e) {
	var elem = e.currentTarget.getAttribute('data-saved'),
		tempSavedActive = document.getElementsByClassName('word_saved')[elem];

	if (data[elem].saved == false) {
		savedWordsArr.push(elem);
		tempSavedActive.classList.add('active');
		data[elem].saved = true;
	} else {
		var indexArr = savedWordsArr.indexOf(elem);
		savedWordsArr.splice(indexArr, 1);
		tempSavedActive.classList.remove('active');
		data[elem].saved = false;
	}
	
};

//Show and hide the saved words
var showSaved = function () {
	var parentSaved = document.getElementById('parent');

	if (showSavedBool == false) {
		parentSaved.remove();

		var parentDiv = document.createElement('div');
			parentDiv.setAttribute('id', 'parent');
			main.appendChild(parentDiv);

		saved.innerHTML = 'Hide Saved Words';

		showSavedBool = true;
		savedWordsPage = true;

		setTimeout(function() {
			for (var i = 0; i < data.length; i++) {
				if (data[i].saved == true) {
					var tempCard = document.createElement('div');
						tempCard.setAttribute('class', 'card');
						tempCard.setAttribute('data-word', i);
						tempCard.addEventListener('click', changeLang);
						var tempContentEn = document.createElement('div');
							tempContentEn.setAttribute('class', 'contentEn');
							tempContentEn.setAttribute('data-en', i);
							tempContentEn.innerHTML = data[i].english;
						var tempContentKr = document.createElement('div');
							tempContentKr.setAttribute('class', 'contentKr');
							tempContentKr.setAttribute('data-kr', i);
							tempContentKr.innerHTML = data[i].korean;
						var tempSaved = document.createElement('div');
							tempSaved.setAttribute('class', 'word_saved');
							tempSaved.setAttribute('data-saved', i);
							tempSaved.addEventListener('click', saveWord);
						var tempRemove = document.createElement('div');
							tempRemove.setAttribute('class', 'word_remove');
							tempRemove.setAttribute('data-remove', i);
							tempRemove.innerHTML = 'X';
							tempRemove.addEventListener('click', destroySaved);

					parentDiv.appendChild(tempCard);

					tempCard.appendChild(tempContentEn);
					tempCard.appendChild(tempContentKr);
					tempCard.appendChild(tempSaved);
					tempCard.appendChild(tempRemove);
				} else {
					console.log('Showing all');
				}
			}
		}, 100);
	} else {
		parentSaved.remove();

		var parentDiv = document.createElement('div');
			parentDiv.setAttribute('id', 'parent');
			main.appendChild(parentDiv);

		saved.innerHTML = 'Show Saved Words';
		
		showSavedBool = false;
		savedWordsPage = false;

		setTimeout(function() {
			for (var i = 0; i < data.length; i++) {
				var tempCard = document.createElement('div');
					tempCard.setAttribute('class', 'card');
					tempCard.setAttribute('data-word', i);
					tempCard.addEventListener('click', changeLang);
					var tempContentEn = document.createElement('div');
						tempContentEn.setAttribute('class', 'contentEn');
						tempContentEn.setAttribute('data-en', i);
						tempContentEn.innerHTML = data[i].english;
					var tempContentKr = document.createElement('div');
						tempContentKr.setAttribute('class', 'contentKr');
						tempContentKr.setAttribute('data-kr', i);
						tempContentKr.innerHTML = data[i].korean;
					var tempSaved = document.createElement('div');
						tempSaved.setAttribute('class', 'word_saved');
						tempSaved.setAttribute('data-saved', i);
						tempSaved.addEventListener('click', saveWord);

				parentDiv.appendChild(tempCard);

				tempCard.appendChild(tempContentEn);
				tempCard.appendChild(tempContentKr);
				tempCard.appendChild(tempSaved);
			}
		}, 100);
	}
};

//Remove saved word from saved list
var destroySaved = function(e) {
	var elem = e.currentTarget,
		dataValue = elem.getAttribute('data-remove'),
		getCard = document.querySelector('div[data-word="' + dataValue +'"]'),
		indexArr = savedWordsArr.indexOf(elem);
		
		savedWordsArr.splice(indexArr, 1);
		data[dataValue].saved = false;

		getCard.remove();
};

//Scroll to top
var scrollTop = function () {
	var scrollIncr = -window.scrollY / (200/15), //200ms is the duration
        scrollInterval = setInterval(function() {
	        if (window.scrollY != 0) {
	            window.scrollBy(0, scrollIncr);
	        } else {
	        	clearInterval(scrollInterval);
	        }
	    }, 15);
};

//Listeners
reverse.onclick = reverseLanguages;
reset.onclick   = resetLanguages;
saved.onclick   = showSaved;
toTop.onclick   = scrollTop;

//Execute
createCards();


