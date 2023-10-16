import { useRouter } from 'next/router'

function FilteredEventsPage() {
  const router = useRouter()

  const filterData = router.query.slug

  return <div>FilteredEventsPage</div>
}
export default FilteredEventsPage
