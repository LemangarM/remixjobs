var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JobSchema   = new Schema({
	  jobTittle: String,
		company: String,
		localisation:String,
		category:String,
		taggs:[String]
});

module.exports = mongoose.model('Job', JobSchema);
