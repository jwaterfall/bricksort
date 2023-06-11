import getCollectionInventories from '@/data/getCollectionInventories';
import Content from './Content';

const CollectionPage = async () => {
  const collectionInventories = await getCollectionInventories();

  return <Content collectionInventories={collectionInventories} />;
};

export default CollectionPage;
