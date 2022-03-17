export default function getName(){
  return 'Utils'
} 

/**
 * La fonction throttle permet d'éviter des appels consécutifs en introduisant un délai. Elle servira surtout lorsque l'on écoutera des évènements pouvant se produire un très grand nombre de fois dans un intervalle de temps très court (scroll, resize, mouseMove...).
 * @param {fn} callback The function to execute periodically
 * @param {number} delay The time in millisecond to wait behind each callback execution
 * @return {void}
 */
export function throttle(callback, delay) {
    var last;
    var timer;
    return function () {
        var context = this;
        var now = +new Date();
        var args = arguments;
        if (last && now < last + delay) {
            // le délai n'est pas écoulé on reset le timer
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                callback.apply(context, args);
            }, delay);
        } else {
            last = now;
            callback.apply(context, args);
        }
    };
}

/**
 * La fonction debounce permet de déclencher l'appel à une fonction après un certain délai (un peu comme la fonction setTimeout()) mais permet en plus de réinitialiser le timer si on demande une nouvelle exécution dans un intervalle de temps plus court que le délai. Par exemple, on peut écouter la frappe d'un utilisateur dans un champ texte, mais ne pas vouloir appeler notre callback seulement si l'utilisateur marque une pause suffisamment longue.
 * @param {[[type]]} callback [[Description]]
 * @param {[[type]]} delay [[Description]]
 * @return {[[type]]} [[Description]]
 */
export function debounce(callback, delay){
  var timer;
  return function(){
    var args = arguments;
    var context = this;
    clearTimeout(timer);
    timer = setTimeout(function(){
      callback.apply(context, args);
    }, delay)
  }
}