import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { trackEvent } from "../utils/analytics";
import { formatPhoneInput, normalizePhone } from "../utils/formatPhone";
import { getUtmParams, submitLead } from "../utils/leadApi";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя минимум из 2 символов").max(80, "Слишком длинное имя"),
  phone: z.string().trim().min(7, "Укажите телефон").max(24, "Слишком длинный телефон"),
  car: z.string().trim().max(120, "Слишком длинное значение").optional(),
  transmissionType: z.string().trim().max(80).optional(),
  symptom: z.string().trim().max(120).optional(),
  message: z.string().trim().max(1000, "Сообщение слишком длинное").optional(),
  consent: z.boolean().refine((value) => value, "Нужно согласие с политикой конфиденциальности"),
  website: z.string().max(0).optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const transmissionOptions = ["DSG", "Powershift", "DCT Hyundai/Kia", "CVT / вариатор", "АКПП", "Не знаю"];
const symptomOptions = ["Рывки", "Пинки", "Ошибки", "Пробуксовка", "Вибрация", "Задержки переключения", "Другое"];

type LeadFormProps = {
  formSource: string;
  defaultTransmission?: string;
  title?: string;
  compact?: boolean;
  successMode?: "redirect" | "inline";
};

export const LeadForm = ({
  formSource,
  defaultTransmission = "",
  title,
  compact = false,
  successMode = "redirect",
}: LeadFormProps) => {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState("");
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      transmissionType: defaultTransmission,
      consent: true,
      website: "",
    },
  });

  const onSubmit = async (values: LeadFormValues) => {
    setServerMessage("");

    try {
      await submitLead({
        ...values,
        phone: normalizePhone(values.phone),
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        formSource,
        ...getUtmParams(),
      });

      trackEvent("lead_submit", { formSource });
      setSent(true);

      if (successMode === "redirect") {
        navigate("/thanks");
      } else {
        setServerMessage("Заявка отправлена. Мы свяжемся с вами по указанному номеру.");
      }
    } catch (error) {
      setServerMessage(error instanceof Error ? error.message : "Не удалось отправить заявку");
    }
  };

  if (sent && successMode === "inline") {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-sm leading-6 text-emerald-100">
        {serverMessage}
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} aria-label={title ?? "Форма заявки"}>
      {title && <h3 className="text-xl font-bold text-ink">{title}</h3>}

      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <label className="field">
          <span>Имя *</span>
          <input type="text" autoComplete="name" placeholder="Иван" {...register("name")} />
          {errors.name && <small>{errors.name.message}</small>}
        </label>

        <label className="field">
          <span>Телефон *</span>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            {...register("phone")}
            onChange={(event) => setValue("phone", formatPhoneInput(event.target.value), { shouldValidate: true })}
          />
          {errors.phone && <small>{errors.phone.message}</small>}
        </label>
      </div>

      <label className="field">
        <span>Марка и модель авто</span>
        <input type="text" autoComplete="off" placeholder="Например, Skoda Octavia 1.8 DSG" {...register("car")} />
        {errors.car && <small>{errors.car.message}</small>}
      </label>

      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <label className="field">
          <span>Тип коробки</span>
          <select {...register("transmissionType")}>
            <option value="">Выберите, если знаете</option>
            {transmissionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Что беспокоит</span>
          <select {...register("symptom")}>
            <option value="">Выберите симптом</option>
            {symptomOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        <span>Комментарий</span>
        <textarea rows={compact ? 3 : 4} placeholder="Когда проявляется симптом, были ли ошибки, что уже проверяли" {...register("message")} />
        {errors.message && <small>{errors.message.message}</small>}
      </label>

      <div className="sr-only" aria-hidden="true">
        <label>
          Не заполняйте это поле
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-muted">
        <input className="mt-1 h-4 w-4 accent-accent" type="checkbox" {...register("consent")} />
        <span>
          Согласен с обработкой персональных данных и{" "}
          <a className="link" href="/privacy">
            политикой конфиденциальности
          </a>
          .
        </span>
      </label>
      {errors.consent && <p className="-mt-2 text-sm text-red-300">{errors.consent.message}</p>}

      {serverMessage && <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-100">{serverMessage}</p>}

      <button className="btn btn-primary w-full" type="submit" disabled={isSubmitting}>
        <Send className="h-4 w-4" aria-hidden="true" />
        {isSubmitting ? "Отправляем..." : "Отправить заявку"}
      </button>

      <p className="text-center text-xs leading-5 text-muted">Ответим, сориентируем по возможной причине и подскажем следующий шаг.</p>
    </form>
  );
};
