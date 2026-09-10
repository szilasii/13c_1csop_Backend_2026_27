type szemely = {
  name: string
};

type dolgozo =
{dolgozoid: number};


type dolgozoSzemely = szemely & dolgozo;

const dolgozo1: dolgozoSzemely = {
  name: "John Doe",
  dolgozoid: 12345
};

console.log(dolgozo1);