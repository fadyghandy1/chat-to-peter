import React, { useState } from 'react'

function Logic() {
  const [fileTypes, setFileTypes] = useState([
    { sTitle: 'The Shawshank Redemption', year: 1994 },
    { sTitle: 'The Godfather', year: 1972 },
    { sTitle: 'The Godfather: Part II', year: 1974 },
    { sTitle: 'The Dark Knight', year: 2008 },
    { sTitle: '12 Angry Men', year: 1957 },
    { sTitle: "Schindler's List", year: 1993 },
    { sTitle: 'Pulp Fiction', year: 1994 },
  ])
  const [officeBranches, setOfficeBranches] = useState([
    { sTitle: 'The Shawshank Redemption', year: 1994 },
    { sTitle: 'The Godfather', year: 1972 },
    { sTitle: 'The Godfather: Part II', year: 1974 },
    { sTitle: 'The Dark Knight', year: 2008 },
    { sTitle: '12 Angry Men', year: 1957 },
    { sTitle: "Schindler's List", year: 1993 },
    { sTitle: 'Pulp Fiction', year: 1994 },
  ])
  const [fileCategories, setFileCategories] = useState([
    { sTitle: 'The Shawshank Redemption', year: 1994 },
    { sTitle: 'The Godfather', year: 1972 },
    { sTitle: 'The Godfather: Part II', year: 1974 },
    { sTitle: 'The Dark Knight', year: 2008 },
    { sTitle: '12 Angry Men', year: 1957 },
    { sTitle: "Schindler's List", year: 1993 },
    { sTitle: 'Pulp Fiction', year: 1994 },
  ])
  const [fileStatuses, setFileStatuses] = useState([
    { sTitle: 'The Shawshank Redemption', year: 1994 },
    { sTitle: 'The Godfather', year: 1972 },
    { sTitle: 'The Godfather: Part II', year: 1974 },
    { sTitle: 'The Dark Knight', year: 2008 },
    { sTitle: '12 Angry Men', year: 1957 },
    { sTitle: "Schindler's List", year: 1993 },
    { sTitle: 'Pulp Fiction', year: 1994 },
  ])
  const [clients, setClients] = useState([
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ])
  const [againsts, setAgainsts] = useState([
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ])
  return { fileTypes, officeBranches, fileCategories, fileStatuses, clients, againsts }
}

export default Logic
