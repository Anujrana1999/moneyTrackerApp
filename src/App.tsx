import { useEffect, useState } from 'react';
import './App.css';

interface Transaction {
  _id: string;
  name: string;
  des: string;
  datetime: string;
  price: string;
  __v: number;
}

function App() {
  const url = 'http://localhost:4000/api/transaction';

  const [transaction, setTransaction] = useState([])
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [des, setDes] = useState('');
  const addNewTransaction = async (e: any) => {
    e.preventDefault();
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        des,
        datetime,
        price
      })
    }).then((response) => {
      response.ok && response.json().then((json) => {
        console.log(json)
      })
    }).catch(err => {
      console.log(err)
    })
  }
  const fetchTransaction = async () => {
    const response = await fetch(url);
    if (response.ok) {
      response.json().then(data => {
        setTransaction(data)
      })
    }
  }
  useEffect(() => {
    fetchTransaction();
  }, [])

  let balance = 0;
  for (const entries of transaction) {
      balance = balance + parseInt((entries as Transaction).price);
  }
  return (
    <>
      <div className='max-w-xl mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 p-4 h-screen'>
        <h1 className='text-center text-4xl font-bold  text-white my-4'>Balance: ₹{balance}</h1>
        <form onSubmit={addNewTransaction} className='my-4'>
          <div>
            <input
              value={price}
              onChange={ev => setPrice(ev.target.value)}
              className='w-full p-1 mt-4'
              type="text" placeholder={'amount'} />
          </div>
          <div className='my-2 flex gap-1 flex-wrap'>
            <input
              value={name}
              onChange={ev => setName(ev.target.value)}
              type="text"
              placeholder={'title'}
              className='w-full p-1 md:flex-1' />
            <input
              value={datetime}
              onChange={ev => setDatetime(ev.target.value)}
              className='w-full p-1 md:flex-1'
              type="date" />
          </div>
          <div>
            <input
              value={des}
              onChange={ev => setDes(ev.target.value)}
              className='w-full p-1'
              type="text" placeholder={'description'} />
          </div>
          <div className='flex'>
            <button
              className='mx-auto my-4 p-2 bg-orange-500 hover:bg-orange-600 text-white'
              type="submit">Add Transction</button>
          </div>
        </form>
        <div className='bg-white p-2 mb-2'>
          {!transaction || transaction.length === 0 ? (<p>No transaction</p>) :
            (transaction.map((item: Transaction) => (
              <div className='flex flex-wrap justify-between items-center border-t-2 first:border-none border-orange-500' key={item._id}>
                <div className='p-2'>
                  <p className='mx-auto font-bold text-gray-700'>{item.name}</p>
                  <p className='mx-auto text-gray-700'>{item.des}</p>
                </div>
                <div className='p-2'>
                  <p className={`mx-auto text-gray-700 ${parseInt(item.price) >= 0 ? 'green' : 'red'}`}>₹{item.price}</p>
                  <p className='mx-auto text-gray-700'>{item.datetime}</p>
                </div>
              </div>
            )))}
        </div>
      </div>
    </>
  );
}

export default App;
