var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JobSchema   = new Schema({
	  jobTittle: String,
		company: String,
		localisation:String,
		contract:String,
		category:String,
		date: Date,
		taggs:[String]
});

module.exports = mongoose.model('Job', JobSchema);
