import React, { useState, useEffect } from "react";
import './test.css';

function Test() {
    const plumber = 'http://127.0.0.1:8000/show'
    const [players, setPlayers] = useState([]);
    const [mssv, setMSSV] = useState('');
    const [full_name, setFull_name] = useState('');
    const [rank, setRank] = useState('');
    const [date, setDate] = useState('');
    const [editingMSSV, setEditingMSSV] = useState('');
    const [editingFull_name, setEditingFull_name] = useState('');
    const [editingRank, setEditingRank] = useState('');
    const [editingDate, setEditingDate] = useState('');
    //GET
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(plumber);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setPlayers(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
        };
    
        fetchData();
      }, []);
    //POST
    const createPlayer = (data) => {
        fetch('http://127.0.0.1:8000/create', {
            
            method: 'POST',
            headers: {
                           "Content-Type": "application/json"
                       },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(() => setPlayers([...players, data]));
    };
    //PUT
    const updatePlayer = (data) => {
        fetch("http://127.0.0.1:8000/Update", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            const updatedPlayers = players.map(player => {
                if (player.mssv === data.mssv) {
                    return { ...player, ...data };
                }
                return player;
            });
            setPlayers(updatedPlayers);
            setEditingMSSV('');
            setEditingFull_name('');
            setEditingRank('');
            setEditingDate('');
        });
    };
    //DELETE
    const deletePlayer = (id) => {
        fetch('http://127.0.0.1:8000/delete', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({mssv: id})
        })
        .then(() => {
            const newList = players.filter(player => player.mssv !== id);
            setPlayers(newList);
        });
        console.log(JSON.stringify({mssv: id}))
    };
    //Handling Add New Player
    const handleChange = (event, key) => {
        const value = event.target.value;
        switch(key) {
            case 'MSSV':
                setMSSV(value);
                break;
            case 'full_name':
                setFull_name(value);
                break;
            case 'rank':
                setRank(value);
                break;
            case 'Date':
                setDate(value);
                break;
            default:
                break;
        }
    };
    //Handling Update player
    const handleInputChange = (e, key, playerId,full_name) => {
        const value = e.target.value;
        switch (key) {
            case 'MSSV':
                setEditingMSSV(value);
                break;
            case 'full_name':
                setEditingFull_name(value);
                break;
            case 'rank':
                setEditingRank(value);
                break;
            case 'Date':
                setEditingDate(value);
                break;
            default:
                break;
        }
    // Set editingMSSV instead of editingPlayerId
    setEditingMSSV(playerId);
    setEditingFull_name(full_name);
    };

    const clickAdd = () => {
        const data = { mssv, full_name, rank, date };
        createPlayer(data);
    };

    const clickUpdate = () => {
        const data = { mssv: editingMSSV, full_name: editingFull_name, rank: editingRank, date: editingDate };
        updatePlayer(data); 
    };

    const clickDelete = (id) => {
        deletePlayer(id);
    };

    return (
        <div>
            <div id='ShowTable'>
                <h1 id='title'>Player Ranking Table</h1>
                <div id='showTable'>
                    <table id='courses'>
                        <thead>
                            <tr>
                                <th>MSSV</th>
                                <th>Full name</th>
                                <th>rank</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.mssv}</td>
                                    <td>{player.full_name}</td>
                                    <td>{player.rank}</td>
                                    <td>{player.date}</td>
                                </tr>
                            ))}
                        </tbody>       
                    </table>
                </div>
            </div>
            <div id='Adding'>
                <input type="text" value={mssv} onChange={(e) => handleChange(e, 'MSSV')} placeholder="MSSV" />
                <input type="text" value={full_name} onChange={(e) => handleChange(e, 'full_name')} placeholder="full_name" />
                <input type="text" value={rank} onChange={(e) => handleChange(e, 'rank')} placeholder="rank" />
                <input type="date" value={date} onChange={(e) => handleChange(e, 'Date')} placeholder="Date" />
                <button onClick={clickAdd}>Add</button>
            </div>
            <div id="updateAndDelete">
                <h2>Update or Delete courses detail</h2>
                <div id="tableUpdateDelete">
                    <table id='updateDelete'>
                        <thead style={{ display: 'block' }}>
                            <tr>
                                <th style={{ width: '5%' }}>MSSV</th>
                                <th style={{ width: '30%' }}>Full name</th>
                                <th style={{ width: '30%' }}>rank</th>
                                <th style={{ width: '35%' }}>Date</th>
                                <th style={{ width: '25%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
                                <tr key={index}>
                                    <td id='body-data'>
                                    <input className="body" style={{ width: '70px' }} type="text" name="MSSV" value={editingMSSV === player.mssv ? editingMSSV : player.mssv} onChange={(e) => handleInputChange(e, 'MSSV', player.mssv,player.full_name)} />
                                    <input className="body" type="text" name="Full name" value={editingMSSV === player.mssv ? editingFull_name : player.full_name} onChange={(e) => handleInputChange(e, 'full_name', player.mssv,player.full_name)} />
                                    <input className="body" style={{ width: '80px' }} type="text" name="rank" value={editingMSSV === player.mssv ? editingRank : player.rank} onChange={(e) => handleInputChange(e, 'rank', player.mssv,player.full_name)} />
                                    <input className="body" style={{ width: '200px' }} type="date" name="Date" value={editingMSSV === player.mssv ? editingDate : player.date} onChange={(e) => handleInputChange(e, 'Date', player.mssv,player.full_name)} />

                                        <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => clickUpdate()}>Update</button>
                                    </td>                                  
                                    <td>
                                        <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => clickDelete(player.mssv)}>&times;</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    </div> 
                </div>
            </div>
    )
}
export default Test