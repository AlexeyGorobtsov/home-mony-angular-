//1(first)

function myWatch() {
  if (location.hash != '') {

    var myLength = document.querySelectorAll('.product-item-picture-wrapper .picture a')["0"].children.length;
    if (myLength == 1) {
      var p2 = new Promise(function (resolve, reject) {
        resolve(1);
      });
      var arr = [];
      p2.then(function first() {
        var count = document.querySelectorAll('.item-box .picture a').length;
        for (var i = 0; i < count; i++) {
          var part = document.querySelectorAll('.item-box .picture a');
          var arr = part[i].children["0"].src;
          var newArr = arr.split(/_/);
          var newNum = +newArr[0].slice(-3) + 1;
          var newSrc = newArr[0].slice(0, -3) + newNum + '_' + newArr[1] + '_' + newArr[2];
          var newImg = part[i].children["0"].cloneNode(true);
          part[i].appendChild(newImg);
          part[i].children["0"].className = 'second-product-image';
          part[i].children["0"].src = newSrc;

          /*
          *
          *
          *
          * */



        }
      }).then(setTimeout(function secondStep() {
        var count = document.querySelectorAll('.second-product-image').length;
        for (j = 0; j < count; j++) {
          var part2 = document.querySelectorAll('.second-product-image');
          var heightImg = part2[j].naturalHeight;
          var newSrc = part2[j].src;
          if (heightImg == 0) {
            arr.push(j);
          }
        }
      }, 200)).then(setTimeout(function thirdStep() {
        for (var i = 0; i < arr.length; i++) {
          var part2 = document.querySelectorAll('.second-product-image');
          var heightImg = part2[arr[i]].naturalHeight;
          var newSrc = part2[arr[i]].src;
          if (newSrc.slice(-4) == 'jpeg') {
            part2[arr[i]].src = newSrc.slice(0, -4) + 'png';
          } else {
            part2[arr[i]].src = newSrc.slice(0, -4) + '.jpeg';
          }
        }
      }, 250)).then(setTimeout(function fourStep() {
        arr = [];
        var count = document.querySelectorAll('.second-product-image').length;
        for (j = 0; j < count; j++) {
          var part2 = document.querySelectorAll('.second-product-image');
          var heightImg = part2[j].naturalHeight;
          var newSrc = part2[j].src
          if (heightImg == 0) {
            arr.push(j);
          }
        }
      }, 400)).then(setTimeout(function fiveStep() {


        for (var i = 0; i < arr.length; i++) {

          var heightImg = document.querySelectorAll('.second-product-image')[arr[i]].naturalHeight;

          if (heightImg == 0) {
            var newSrc = document.querySelectorAll('.second-product-image')[arr[i]].src;
            var newArr = newSrc.split(/_/);
            var newNum = +newArr[0].slice(-3) - 2;
            var newSrc2 = newArr[0].slice(0, -3) + newNum + '_' + newArr[1] + '_' + newArr[2];
            document.querySelectorAll('.second-product-image')[arr[i]].src = newSrc2;
          }
        }
      }, 400)).then(setTimeout(function sixStep() {


        for (var i = 0; i < arr.length; i++) {
          var part2 = document.querySelectorAll('.second-product-image');
          var heightImg = part2[arr[i]].naturalHeight;
          var newSrc = part2[arr[i]].src;
          if (newSrc.slice(-4) == 'jpeg') {
            part2[arr[i]].src = newSrc.slice(0, -4) + 'png';
          } else {
            part2[arr[i]].src = newSrc.slice(0, -4) + '.jpeg';
          }
        }
      }, 500)).then(setTimeout(function sevenStep() {
        var part3 = document.querySelectorAll('.second-product-image');
        var count = part3.length;
        for (var k = 0; k < part3.length; k++) {
          var heightImg = part3[k].naturalHeight;
          if (heightImg == 0) {
            part3[k].remove();

          }
        }
      }, 600));
    }
  }
}

window.addEventListener('hashchange', myWatch);



// ilove-2.0

var myLength = document.querySelectorAll('.product-item-picture-wrapper .picture a')["0"].children.length;

function first() {
  var count = document.querySelectorAll('.item-box .picture a').length;
  arr2 = [];
  for (var i = 0; i < count; i++) {
    var part = document.querySelectorAll('.item-box .picture a');
    var arr = part[i].children["0"].src;
    var newArr = arr.split(/_/);
    var newNum = +newArr[0].slice(-3) + 1;
    var newSrc = newArr[0].slice(0, -3) + newNum + '_' + newArr[1] + '_' + newArr[2];
    var newImg = part[i].children["0"].cloneNode(true);
    part[i].appendChild(newImg);
    part[i].children["0"].className = 'second-product-image';
    // part[i].children["0"].src = newSrc;
    arr2.push(newSrc);

  }
}


first()

function loadImage(url) {
  //объект "обещание"
  return new Promise(function(resolve, reject)
  {
    var img = new Image();
    img.onload = function()
    {
      //в случае успешной загрузки изображения, результат "обещания" будет url этого изображения
      return resolve(url);
    }
    img.onerror = function()
    {
      //в случае не успешной загрузки изображения, результат "обещания" будет url этого изображения
      return reject(url);
    }
    img.src = url;
  });
}

var arr3 = [];
var count = document.querySelectorAll('.second-product-image').length;
for( var i = 0; i< count; i++) {
  loadImage(arr2[i])
    .then(function(url)
    {
      document.querySelectorAll('.second-product-image')[i].src = url;
    })
    .catch(function(url)
    {
      arr3.push(url);
      console.log("не удалось загрузить изображение по указанному пути: ", url);
    });

}




  /*==================================================================*/

  var imgList = arr2;
  function loadAndDisplayImages(imgList)  {
    var notLoaded = [];//сохраним url, какие не были загружены
    var loaded = [];//сохраним url, какие были загружены
    var promiseImgs = imgList.map(loadImage);

    //вернем результат работы вызова reduce(...) - объект Promise, чтобы можно было потом  при необходимости продолжить цепочку вызовов:
    //loadAndDisplayImages(...).then(...).catch(...);
    return promiseImgs.reduce(function (previousPromise, currentPromise)
    {
      return previousPromise
        .then(function()
        {
          //выполняется этот участок кода, так как previousPromise - в состоянии resolved (= Promise.resolve())
          return currentPromise;
        })
        .then(function(url) //для "обещаний" в состоянии resolved
        {

          loaded.push(url);
          return Promise.resolve(url);
        })
        .catch(function(url)//для "обещаний" в состоянии rejected
        {
          console.log('не удалось загрузить изображение по указанному пути: ', url);
          notLoaded.push(url);
          return Promise.resolve(url);
        });

    }, Promise.resolve())
      .then(function (lastUrl)
      {
        console.log('lastUrl:', lastUrl);

        let res = {loaded: loaded, notLoaded: notLoaded};

        //но мы вернем Promise, значение которого будет объект
        return Promise.resolve(res);
      });

  }

  loadAndDisplayImages(imgList)
    .then(function(loadRes)
    {
      console.log(loadRes);
    })
    .catch(function(err)
    {
      console.log(err);
    });

  /*============================================================================*/

  function first() {
    var count = document.querySelectorAll('.item-box .picture a').length;
    arr2 = [];
    for (var i = 0; i < count; i++) {
      var part = document.querySelectorAll('.item-box .picture a');
      var arr = part[i].children["0"].src;
      var newArr = arr.split(/_/);
      var newNum = +newArr[0].slice(-3) + 1;
      var newSrc = newArr[0].slice(0, -3) + newNum + '_' + newArr[1] + '_' + newArr[2];
      var newImg = part[i].children["0"].cloneNode(true);
      part[i].appendChild(newImg);
      part[i].children["0"].className = 'second-product-image';
      //part[i].children["0"].src = newSrc;


      arr2.push(newSrc);
    }
  }



function loadImage(url) {
  //объект "обещание"
  return new Promise(function(resolve, reject){
    var img = new Image();
    img.onload = function() {
      //в случае успешной загрузки изображения, результат "обещания" будет url этого изображения
      return resolve(url);
    }
    img.onerror = function() {
      //в случае не успешной загрузки изображения, результат "обещания" будет url этого изображения
      return reject(url);
    }
    img.src = url;
  });
}

window.onload = function() {
    let parsedUrl = new URL(window.location.href);
    let language = parsedUrl.pathname.split("/");
    if (language[1] == 'sv') {
      document.querySelectorAll('.lang')["0"].innerText = 'SV';
      document.querySelectorAll('.lang')["0"].style.backgroundImage = "url(/media/1074/icon_se.png)";
    } else {
      document.querySelectorAll('.lang')["0"].innerText = 'EN';
      document.querySelectorAll('.lang')["0"].style.backgroundImage = "url(/media/1073/icon_en.png)";
    }
}



