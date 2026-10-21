import { useParams } from 'react-router-dom'
import Container from '@/components/Container'
import { Reveal } from '@/components/animations'
import usePageMeta from '@/lib/usePageMeta'
import { getDepartmentDetail } from '@/data/departmentDetails'
import { departmentDetailUi } from '@/lib/content/departemen'
import BackToDepartments from '@/sections/departemen/BackToDepartments'
import HeroDepartemen from '@/sections/departemen/HeroDepartemen'
import AboutDepartemen from '@/sections/departemen/AboutDepartemen'
import ProgramKerja from '@/sections/departemen/ProgramKerja'
import DepartmentPager from '@/sections/departemen/DepartmentPager'

function NotFound() {
  return (
    <section className="bg-ivory py-section lg:py-section-lg">
      <Container className="min-h-[50vh]">
        <BackToDepartments />
        <Reveal as="h1" className="mt-8 text-display font-bold text-brand">
          {departmentDetailUi.notFoundTitle}
        </Reveal>
        <Reveal as="p" variant="fadeIn" delay={0.15} className="mt-4 text-body font-medium text-brand">
          {departmentDetailUi.notFoundText}
        </Reveal>
      </Container>
    </section>
  )
}

export default function DepartmentDetail() {
  const { slug } = useParams()
  const dept = getDepartmentDetail(slug)

  usePageMeta(
    dept
      ? { title: `${dept.fullName} | UAKI UB`, description: `Departemen ${dept.fullName} UAKI Universitas Brawijaya.` }
      : { title: `${departmentDetailUi.notFoundTitle} | UAKI UB` },
  )

  if (!dept) return <NotFound />

  return (
    <>
      <HeroDepartemen dept={dept} hasProker={dept.hasProker} />
      <AboutDepartemen dept={dept} />
      {dept.hasProker && <ProgramKerja dept={dept} proker={dept.proker} />}
      <DepartmentPager prev={dept.prev} next={dept.next} />
    </>
  )
}
