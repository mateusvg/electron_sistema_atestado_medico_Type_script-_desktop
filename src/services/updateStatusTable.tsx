import { relativeURI } from '../helpers/RelativeURI'
const uriRelative = relativeURI()
export const updateStatusTableAdmin = async (...props: any) => {
  console.log(JSON.stringify(props[0].status) + "propriedades")
  if (props[0].status === 'Em processamento') {
    props[0].status = '1'
  } else if (props[0].status === 'Aprovado') {
    props[0].status = '2'
  } else {
    props[0].status = '3'
  }

  console.log(JSON.stringify(props[0].status) + "APOS")

  const uri = `${uriRelative}status/status/update/admin`
  try {
    const response = await fetch(
      uri, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props[0]),
    })
    if (response.ok) {
      console.log("Status successfully update")
    }
  } catch (error) {
    console.error(error);
  }
};