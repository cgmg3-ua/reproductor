// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQC3WRgKa4mVH65p8e_xNtvp2UPDU6xT-rFq-RL6OAS0ts6zDwrV9B8h0hwr9o5jRjoELXeepjLOnz_vjWQSIwxYUJv42qKXo88zZkmdFx8wy-69vwBreJs1R51nk6UI80StkXY6-C4953KYLSTOJzrWiXUf59JJ47fYr0qfdGGsdpDP26dgOT46n5VXOmG_6MpVq1pQPHvk7yteAkItuMOzYncyQfeQPDQBaBClKEghHK_ETdQmW5_PAa5bQrLoeZ8z4JZNp8vY';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);