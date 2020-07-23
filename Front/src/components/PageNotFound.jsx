import React from 'react';
import '../Style/PageNotFound.css';


function PageNotFound() {
  
  return (
    <div className="center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-65 -65 130 130" width="400" height="400">
	<defs>
		<circle id="circle" r="25" />

		<mask id="mask__circle">
			<use fill="hsl(0, 0%, 100%)" href="#circle" />
			<g fill="hsl(0, 0%, 0%)">
				<rect x="-50" y="8" width="100" height="5" />
				<rect x="-15" y="-50" width="10" height="100" />
			</g>
		</mask>
		<filter id="blur">
			<feGaussianBlur stdDeviation="3" />
		</filter>
	</defs>

	<g fill="currentColor">
		<g mask="url(#mask__circle)">
			<use href="#circle" />
		</g>
		<g class="rotate">
			<g fill="currentColor" stroke="none">
				<path filter="url(#blur)" opacity="0.5" d="M 0 40 a 35 35 0 0 1 0 -70 10 10 0 0 0 0 -20 45 45 0 0 0 0 90" />
				<path d="M 0 40 a 39 39 0 0 1 0 -78 2 2 0 0 0 0 -4 41 41 0 0 0 0 82" />
			</g>
		</g>
	</g>
</svg>
      <h1>Hey, cette page n'existe pas !</h1> 
    </div>
  )
}
  
export default PageNotFound;