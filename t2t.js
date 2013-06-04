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
			//.replace(/^- ([^*]+)$/, '<ul><li>$1</li></ul>')
			//.replace(/- /, '<ul><li>')
			//.replace(/\s*- ([^*]+)/, '* $1')
			//.replace(/^ - ([^*]+)$/, '<ul><li>$1</li></ul>')
			//.replace(/^    - ([^*]+)$/, '<ul><li>$1</li></ul>')
			.replace(/\s*=====([^*]+)=====/, '<h5>$1</h5>')
			.replace(/\s*====([^*]+)====/, '<h4>$1</h4>')
			.replace(/\s*===([^*]+)===/, '<h3>$1</h3>')
			.replace(/\s*==([^*]+)==/, '<h2>$1</h2>')
			.replace(/\s*=([^*]+)=/, '<h1>$1</h1>')
			.replace(/\[([^\]]*).jpg\]/g, '<img alt="$1" src="$1.jpg">')
			.replace(/\[([^\]]*).png\]/g, '<img alt="$1" src="$1.png">')
			.replace(/\[([^*]+) http([^*]+)]/g, '$1'.link('http$2'))
			//.replace(/http([^*]+)\s+/, '<a href="http$1">http$1</a>')
			.replace(/``([^`]+)``/g, '<code>$1</code>')
			.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
			.replace(/(-|_){20,}/g, '<hr/>')
			.replace(/(=){20,}/g, '<hr noshade="" size="5"/>')
			.replace(/--([^*]+)--/g, '<s>$1</s>')
			.replace(/\/\/([^*]+)\/\//g, '<i>$1</i>')
			.replace(/__([^*]+)__/g, '<u>$1</u>')
			.replace(/\t([^*]+)/g, '<blockquote>$1</blockquote>')
			.replace(/\t\t([^*]+)/g, '<blockquote><blockquote>$1</blockquote></blockquote>')
			.replace(/``` ([^*]+)$/, '<pre>$1</pre>')
			//.replace(/\s*|([^*]+)/, '<table><td>$1</td></table>')
			.replace(/^% ([^*]+)$/, '');
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
		//	'-':[/\n\- /,'<ul><li>','</li></ul>'],
		//	'-':[/\- /,'<li>','</li>'],
		//	'+':[/\+ /,'<ol><li>','</li></ol>'],
		//	'-':[/\s+- /,'<ul><li>','</li></ul>'],
		//	'-':[/(-|_){20,}/g, '<hr/>',''],
		//	'1':[/\n[1-9]\d*\.? /,'<ol><li>','</li></ol>'],
		//	' ':[/\n    /,'<pre><code>','</pre></code>','\n'],
		//	'>':[/\n> /,'<blockquote>','</blockquote>','\n']
		}[f];
		h+=
			R?R[1]+('\n'+b)
				.split(R[0])
				.slice(1)
				.map(R[3]?escape:inlineEscape)
				.join(R[3]||'</li>\n<li>')+R[2]:
				//.join(R[3]||'')+R[2]:
			//f=='#'?'<h'+(f=b.indexOf(' '))+'>'+inlineEscape(b.slice(f+1))+'</h'+f+'>':
			//f=='<'?b:
			'<p>'+inlineEscape(b)+'</p>';
	});
	return h;
};
