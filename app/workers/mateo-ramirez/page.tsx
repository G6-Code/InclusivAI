"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function MateoRamirezProfile() {
  const router = useRouter()

  return (
    <main className="container mx-auto px-6 py-10 max-w-3xl bg-card shadow-md rounded-lg">
      
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-primary">Worker Profile</h1>
      </div>

      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-2">Mateo Ramírez</h2>
        <p className="text-sm text-muted-foreground mb-4">Worker ID: W-2025-MR01</p>

        <div className="space-y-4 text-card-foreground text-sm leading-relaxed">
          <p>
            Mateo Ramírez acaba de comenzar un nuevo trabajo como asistente administrativo en
            <strong> Tech Solutions Inc.</strong>, ubicada en <strong>1100 K Street NW, Washington, D.C.</strong>.
            Su primer día de trabajo fue el <strong>1 de abril de 2024</strong>, y su contrato establece una jornada de
            <strong> 40 horas semanales</strong>, trabajando de lunes a viernes con un salario de <strong>$24.00 por hora</strong>.
          </p>

          <p>
            Para trasladarse a su trabajo, Mateo utiliza el Metro de Washington, ya que vive en un apartamento en
            <strong> Silver Spring, Maryland</strong>, y no posee automóvil. No cuenta con estacionamiento privado en la oficina,
            por lo que depende completamente del transporte público. Su horario es diurno, de <strong>9:00 a.m. a 5:00 p.m.</strong>,
            y no se le exige trabajar fines de semana ni turnos nocturnos.
          </p>

          <p>
            Como parte de su paquete de beneficios, Mateo tiene acceso a <strong>licencia por enfermedad</strong>,
            <strong> seguro médico y dental</strong>, así como <strong>descuentos para empleados</strong> en gimnasios y tiendas asociadas.
            Además, la empresa ofrece <strong>comidas gratuitas</strong> en la cafetería del edificio, lo que le permite ahorrar en alimentación
            durante la semana laboral.
          </p>

          <p>
            Su entorno de trabajo es en una <strong>oficina moderna y accesible</strong>, con un nivel moderado de contacto social,
            ya que debe interactuar con clientes y colegas de diferentes departamentos. Su carga de trabajo es ligera a moderada,
            y la mayoría de sus tareas se realizan en un espacio de oficina compartido con acceso a salas de reuniones.
          </p>

          <p>
            Después de su primer mes, su supervisora <strong>Laura Gómez</strong> evaluó su desempeño como satisfactorio.
            Mateo ha demostrado ser puntual y organizado, pero necesita mejorar en la <strong>gestión de múltiples tareas simultáneamente</strong>.
            Como resultado, se le ha recomendado tomar una capacitación adicional en <strong>manejo del tiempo</strong> y
            <strong> herramientas de productividad</strong>.
          </p>

          <p>
            Su próximo paso será asistir a estos entrenamientos y recibir apoyo de sus compañeros para mejorar su eficiencia
            en las tareas asignadas. Con el tiempo, espera <strong>ascender dentro de la compañía</strong> y aprovechar todas las
            oportunidades de crecimiento profesional que <strong>Tech Solutions Inc.</strong> le ofrece.
          </p>
        </div>
      </div>
    </main>
  )
}
