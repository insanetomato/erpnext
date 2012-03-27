// render
wn.doclistviews['Support Ticket'] = wn.views.ListView.extend({
	init: function(d) {
		this._super(d)
		this.fields = this.fields.concat([
			"`tabSupport Ticket`.status", 
			"`tabSupport Ticket`.subject",
			"`tabSupport Ticket`.description"
		]);
		this.stats = this.stats.concat(['status']);
	},
	
	prepare_data: function(data) {
		this._super(data);
		if(data.status=='Open' || data.status=='To Reply') {
			data.label_type = 'important'
		}
		else if(data.status=='Closed') {
			data.label_type = 'success'
		}
		else if(data.status=='Hold') {
			data.label_type = 'info'
		}
		else if(data.status=='Waiting for Customer') {
			data.label_type = 'info'
			data.status = 'Waiting'
		}
		data.status_html = repl('<span class="label label-%(label_type)s">%(status)s</span>', data);
		
		data.description = data.description + ' | ' + data.subject;
		
		// description
		if(data.description && data.description.length > 50) {
			data.description = '<span title="'+data.description+'">' + data.description.substr(0,50) + '...</span>';
		}
	},
	
	columns: [
		{width: '20%', content:'name'},
		{width: '10%', content:'status_html'},		
		{width: '56%', content:'tags+description', css: {color:'#aaa'}},
		{width: '14%', content:'modified', css: {'text-align': 'right', 'color':'#777'}}
	]

});