var define = function(name, value) {
	if(typeof window !== 'undefined') {  
		window.minesweep = window.minesweep || {};
		window.minesweep[name] = value;
	}
};
 
define("define", define); 
// if(typeof window === 'undefined') { 
// 	module.exports = define; 
// } else {
// 	define("define", define);
// }