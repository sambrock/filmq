import { getInitialListStoreData } from '@/server/list/getInitialListStoreData';
import { ListTitleEdit } from '@/components/list/ListTitle/ListTitleEdit';
import { ListMoviesEdit } from '@/components/list/ListMovies/ListMoviesEdit';
import { InitListStore } from '@/app/InitListStore';
import { MovieLoader } from './MovieLoader';
import { MovieSearch } from '@/components/search/MovieSearch';
import { EditShortcuts } from './EditShortcuts';
import { ListActionsEdit } from '@/components/list/ListActions/ListActionsEdit';
import { ListHeader } from '@/components/list/ListHeader';
import { ListDescriptionEdit } from '@/components/list/ListDescription/ListDescriptionEdit';
import { parseMarkdown } from '@/utils/parseMarkdown';

type EditListPageProps = {
  params: {
    listId: string;
  };
};

const EditListPage = async ({ params }: EditListPageProps) => {
  const { initialData, listCount, listMovieIds } = await getInitialListStoreData(params.listId);

  return (
    <main>
      <div className="fixed left-1/2 top-4 w-full max-w-lg -translate-x-1/2">
        <MovieSearch />
      </div>

      <div className="grid gap-4">
        <ListHeader
          actions={<ListActionsEdit />}
          title={<ListTitleEdit initialTitle={initialData?.title || ''} />}
          description={<ListDescriptionEdit initialDescription={parseMarkdown(initialData?.description) || ''} />}
        />
        <ListMoviesEdit initialMovies={JSON.stringify(initialData?.movies.map((m) => m.movie) || [])} />
      </div>

      <EditShortcuts />
      <MovieLoader listId={params.listId} count={listCount} />
      <InitListStore initialListData={JSON.stringify(initialData)} initialListMovieIds={listMovieIds || []} />
    </main>
  );
};

export default EditListPage;
