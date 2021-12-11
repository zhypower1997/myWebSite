import { useEffect, useState } from "react"

export default function Post({ msg, b, aa }) {
	let [ss, setSs] = useState(aa);
	let sss = async function(){
		let data = await a();
		setSs(data.cat);
	}
	useEffect(()=>{
		sss();
	}, [])
  return (
    <div>
			{b.code}
			{ss}
		</div>
  )
}
let a = async function(){
	return new Promise((res, rej)=>{
		res({code:'111111', cat: '22222'});
	})
}
Post.getInitialProps =async () => {
let b = await a();
	
  return {
    msg: 'this is test data of getInitialProps()',
		b,
		aa: b.cat
  }
}
