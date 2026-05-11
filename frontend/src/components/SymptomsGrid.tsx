import { AlertTriangle, Bug, Clock, Gauge, RadioTower, RotateCcw, Volume2, Zap } from "lucide-react";

const symptoms = [
  ["Пинки и рывки при переключении", Zap],
  ["Задержки при старте", Clock],
  ["Вибрация в пробках", Gauge],
  ["Ошибки по коробке", Bug],
  ["Пробуксовка сцепления", RotateCcw],
  ["Посторонние звуки", Volume2],
  ["Машина уходит в аварийный режим", AlertTriangle],
  ["После прогрева поведение ухудшается", RadioTower],
] as const;

type SymptomsGridProps = {
  onOpenLeadModal: () => void;
};

export const SymptomsGrid = ({ onOpenLeadModal }: SymptomsGridProps) => (
  <section className="section">
    <div className="container-px mx-auto max-w-7xl">
      <div className="section-head">
        <p className="eyebrow">Симптомы</p>
        <h2>Когда пора проверить коробку передач</h2>
        <p>
          Если коробка пинается, задерживает передачи или появляются ошибки, лучше сначала понять причину. Так проще
          избежать лишних замен и дорогой покупки агрегата.
        </p>
      </div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {symptoms.map(([title, Icon]) => (
          <div key={title} className="service-tile">
            <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
            <h3>{title}</h3>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="btn btn-primary" type="button" onClick={onOpenLeadModal}>
          Опишите симптом — подскажем, с чего начать
        </button>
      </div>
    </div>
  </section>
);
