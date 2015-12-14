// BASE SETUP
// =============================================================================

// call the packages we need
var cheerio = require('cheerio');
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var request = require('request');
var remixjobs = express();

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/'); // connect to our database
var Job     = require('./app/models/job');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /jobs
// ----------------------------------------------------
router.route('/jobs')

	// create a job (accessed at POST http://localhost:8080/jobs)
	.post(function(req, res) {

		var job = new Job();		// create a new instance of the Job model

		job.jobTittle = req.body.jobTittle;
		job.company = req.body.company;
		job.localisation = req.body.localisation;
		job.category = req.body.category;
		job.description = req.body.description;
		job.contract = req.body.contract;
		job.date = req.body.date;
		job.tags = req.body.tags;
		job.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Job created!' });
		});


	})

	// get all the jobs (accessed at GET http://localhost:8080/api/jobs)
	.get(function(req, res) {
		Job.find(function(err, jobs) {
			if (err)
				res.send(err);

			res.json(jobs);
		});
	});

// on routes that end in /jobs/:job_id
// ----------------------------------------------------
router.route('/jobs/:job_id')

	// get the job with that id
	.get(function(req, res) {
		Job.findById(req.params.job_id, function(err, job) {
			if (err)
				res.send(err);
			res.json(job);
		});
	})

	// update the job with this id
	.put(function(req, res) {
		Job.findById(req.params.job_id, function(err, job) {

			if (err)
				res.send(err);

			job.name = req.body.name;
			job.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Job updated!' });
			});

		});
	})

	// delete the job with this id
	.delete(function(req, res) {
		Job.remove({
			_id: req.params.job_id
		}, function(err, job) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

	// REGISTER OUR ROUTES -------------------------------
	app.use('/api', router);

  app.get('/scrape', function(req,res){

	          Job.remove({}, function(err) {
	          console.log('collection removed')
	          });

	          for(i=1;i<=2;i++){

	          var url='https://remixjobs.com/?page='+i;

	          request(url, function(error, response,html){

	             if(!error){
	                 var $=cheerio.load(html);

	                 $(this).text();

									 $('.jobs-list .job-item').each(function(i,elem){
                   var job = new Job();
									 //Delete collection jobs

	                 jobTittle = $('[class="job-link"]',this).text();
	                 company = $('[class="company"]',this).text();
	                 localisation = $('[class="workplace"]',this).text();
	                 category = $('[class="contract clearfix"]',this).text().replace(/^\s+|\s+$/g, "");;
                   job.jobTittle = jobTittle;
									 job.company = company;
									 job.localisation=localisation;
									 job.category=category;
	                 $('.job-tags .tag',this).each(function(j,elem){
	                 var tag = $(this).text();
									 tag = tag.replace(/^\s+|\s+$/g, "");
                   job.taggs.push(tag);
								   })

									 job.save(function(err) {
									 if (err)
									 res.send(err);
									 });
									 console.log(job);
	                 //json.push({jobTittle:jobTittle, company:company, localisation:localisation, category:category,taggs:taggs});
	                 }); //fin each function
	              } //fin error
	           }) //fin request url2
	       } //fin boucle for
				 res.send('Check the postman for localhost:8080/api/jobs')
	}) //fin


// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Magic happens on port ' + port);
