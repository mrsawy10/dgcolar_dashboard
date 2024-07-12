import SingleAnimal from 'src/sections/animals/single';
import { Helmet } from 'react-helmet-async';
import useAuthStore from 'src/store/authStore';
import { useParams } from 'react-router-dom';

export default function SingleAnimalPage() {
  const { animalId, categoryId } = useParams();
  const { user } = useAuthStore();
  try {
    const category = user.categories.find((ele) => ele._id === categoryId);
    const animal = category.animals.find((ele) => ele._id === animalId);
    if (!animal) throw new Error('Animal not found');

    return (
      <>
        <Helmet>
          <title> Animal | DG Collar </title>
        </Helmet>
        <SingleAnimal animal={animal} category={category} />
      </>
    );
  } catch (err) {
    console.log({ err });
    return <div className="container mx-auto mt-12 text-center text-lg">No Animal Found</div>;
  }
}
