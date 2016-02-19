(function() {
    var checkBoxes = document.querySelectorAll('[type=checkbox]');
    for (var index = 0; index < checkBoxes.length; index++) {
        var element = checkBoxes[index];
        element.addEventListener('change', function(e) {
            switch (e.target.id) {
                case 'doConsole': 
                    handleChange(doConsole, e.target.checked);
                    break;
                case 'doAlert': 
                    handleChange(doAlert, e.target.checked);
                    break;
                case 'doResult': 
                    handleChange(doResult, e.target.checked);
                    break;
                default:
                    throw new Error('Wrong checkBoxId: ' + e.target.id);
                    break;
            }
            function handleChange(action, addFlag) {
                var clicker = document.getElementById('clicker');
                if (addFlag) {
                    clicker.addEventListener('click', action);
                } else {
                    clicker.removeEventListener('click', action);
                }
            }
        });
    }

    function doConsole() {
        console.log('Hello!!!');
    }
    function doAlert() {
        alert('Hello!!!');
    }
    function doResult() {
        var output = document.getElementById('result');
        output.textContent +=  'Hello!!!';
    }
})();