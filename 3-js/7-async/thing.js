function callBackQueue() {
  console.log('Start');

  setTimeout(function cb() {
    console.log('Callback 1');
  }, 1);

  console.log('Middle');

  setTimeout(function cb1() {
    console.log('Callback 2');
  }, 0);

  console.log('End');
}

callBackQueue();