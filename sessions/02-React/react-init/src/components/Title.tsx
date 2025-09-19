import { useEffect, useState } from "react";

function usePaulState(initial) {
    let stateValue = initial;
    const setValue = (value) => {
        stateValue = value;
    }
    return [stateValue,setValue];
}

export const Title = ({ name, title }) => {
    const [lastname, setLastname] = useState();
    // solo se ejecute la primera vez 

    useEffect(()=> {
      setLastname('Landaeta');
    }, []);
  return (
    <>
      <div> Hola {name} {lastname} desde {title}</div>
    </>
  );
};

