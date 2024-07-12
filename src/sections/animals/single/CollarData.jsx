import React, { useEffect, useState } from 'react';
import { API_URL } from 'src/constants';
import useAuthStore from 'src/store/authStore';
import useGeneralStore from '../../../store/generalStore';
import AnomalyChart from './AnomalyChart';
// import CollarReactChart from './collarReactChart';
// import CollarChart from './CollarChart';
// import CollarMaterialChart from './CollarMaterialChart';

function CollarData({ collarId }) {
  const [data, setData] = useState(null);
  const { token } = useAuthStore();
  const { setGeneralIsLoading } = useGeneralStore();
  useEffect(() => {
    (async () => {
      try {
        setGeneralIsLoading(true);
        const response = await fetch(`${API_URL}/collar/${collarId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result && response.ok) setData(result.data);
      } catch (err) {
        console.log(err);
        return <div className="m-auto mt-5">No Data</div>;
      } finally {
        setGeneralIsLoading(false);
      }
    })();
  }, []);
  //   useEffect(() => {
  //     console.log({ data });
  //   }, [data]);CollarReactChart
  //   return <div>{data && <CollarChart data={data} />}</div>;
  //   return <div>{data && <CollarMaterialChart data={data} />}</div>;
  return (
    <div className="w-full m-auto container mt-9">
      <h1 className="my-5 mt-24 shadow md:w-5/12 mx-auto p-3 text-xl font-extrabold border-teal-400 bg-zinc-100 rounded-md text-center">
        {' '}
        Collar Data
      </h1>
      {data && <AnomalyChart data={data} />}
    </div>
  );
  //   return <div>{data && <CollarReactChart data={data} />}</div>;
}

export default CollarData;
