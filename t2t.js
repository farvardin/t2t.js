;function t2t(src)
{
	var h='';

	function escape(t)
	{
		return new Option(t).innerHTML;
	}
	function inlineEscape(s)
	{
		return escape(s)
			.replace(/\s*=====([^*]+)=====/, '<h5>$1</h5>')
			.replace(/\s*====([^*]+)====/, '<h4>$1</h4>')
			.replace(/\s*===([^*]+)===/, '<h3>$1</h3>')
			.replace(/\s*==([^*]+)==/, '<h2>$1</h2>')
			.replace(/\s*=([^*]+)=/, '<h1>$1</h1>')
			.replace(/!\[([^\]]*)]\(([^(]+)\)/g, '<img alt="$1" src="$2">')
			.replace(/\[([^*]+) http([^*]+)]/g, '$1'.link('http$2'))
			//.replace(/http([^*]+)\s+/, '<a href="http$1">http$1</a>')
			.replace(/``([^`]+)``/g, '<code>$1</code>')
			.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
			.replace(/\-\-([^*]+)\-\-/g, '<s>$1</s>')
			.replace(/\/\/([^*]+)\/\//g, '<i>$1</i>')
			.replace(/\_\_([^*]+)\_\_/g, '<u>$1</u>');
	}

	src
	//.replace(/^\s+|\r|\s+$/g, '')
	//.replace(/\t/g, '    ')
	.split(/\n\n+/)
	.forEach(function(b, f, R)
	{
		f=b[0];
		R=
		{
			'-':[/\n\- /,'<ul><li>','</li></ul>'],
			'-':[/\- /,'<li>','</li>'],
			'+':[/\+ /,'<ol><li>','</li></ol>'],
			'-':[/\s+- /,'<ul><li>','</li></ul>'],
		//	'1':[/\n[1-9]\d*\.? /,'<ol><li>','</li></ol>'],
		//	' ':[/\n    /,'<pre><code>','</pre></code>','\n'],
			'>':[/\n> /,'<blockquote>','</blockquote>','\n']
		}[f];
		h+=
			R?R[1]+('\n'+b)
				.split(R[0])
				.slice(1)
				.map(R[3]?escape:inlineEscape)
				.join(R[3]||'</li>\n<li>')+R[2]:
			f=='#'?'<h'+(f=b.indexOf(' '))+'>'+inlineEscape(b.slice(f+1))+'</h'+f+'>':
			f=='<'?b:
			'<p>'+inlineEscape(b)+'</p>';
	});
	return h;
};
