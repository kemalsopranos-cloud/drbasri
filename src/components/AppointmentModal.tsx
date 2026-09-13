import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, MessageSquare, Clock, X, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Language, Appointment, ExpertiseItem } from '../types';
import { uiTranslations } from '../translations';
import { getExpertiseItems } from '../data';

interface AppointmentModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onAppointmentCreated: (appointment: Appointment) => void;
}

export default function AppointmentModal({
  language,
  isOpen,
  onClose,
  onAppointmentCreated,
}: AppointmentModalProps) {
  const t = uiTranslations[language];
  const specialties = getExpertiseItems(language);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [topicId, setTopicId] = useState('');
  const [notes, setNotes] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  // Validation/UI states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Custom Form Validation
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      tempErrors.fullName = t.appointmentFormRequired;
    } else if (fullName.trim().split(' ').length < 2) {
      tempErrors.fullName = language === 'TR'
        ? 'Lütfen adınızı ve soyadınızı tam giriniz.'
        : 'Please enter your full name (first and last name).';
    }

    if (!phone.trim()) {
      tempErrors.phone = t.appointmentFormRequired;
    } else if (phone.replace(/\D/g, '').length < 9) {
      tempErrors.phone = language === 'TR'
        ? 'Geçerli bir telefon numarası giriniz (En az 10 hane).'
        : 'Please enter a valid phone number.';
    }

    if (!email.trim()) {
      tempErrors.email = t.appointmentFormRequired;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = language === 'TR' ? 'E-posta formatı geçersizdir.' : 'Invalid email format.';
    }

    if (!preferredDate) {
      tempErrors.preferredDate = t.appointmentFormRequired;
    } else {
      // Prevent past dates
      const selected = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        tempErrors.preferredDate = language === 'TR' ? 'Geçmiş bir tarih seçemezsiniz.' : 'Cannot select a past date.';
      }
    }

    if (!preferredTime) {
      tempErrors.preferredTime = t.appointmentFormRequired;
    }

    if (!topicId) {
      tempErrors.topicId = t.appointmentFormRequired;
    }

    if (!privacyConsent) {
      tempErrors.privacyConsent = language === 'TR'
        ? 'Randevu için aydınlatma metnini onaylamanız gerekmektedir.'
        : 'You must accept the privacy terms to request an appointment.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate clinical network synchronization delay
    setTimeout(() => {
      const newAppointment: Appointment = {
        id: `apt-${Date.now()}`,
        fullName,
        phone,
        email,
        preferredDate,
        preferredTime,
        topicId,
        notes: notes.trim() || undefined,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Bubble up to update local state and save to local storage
      onAppointmentCreated(newAppointment);
      
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setPreferredDate('');
    setPreferredTime('');
    setTopicId('');
    setNotes('');
    setPrivacyConsent(false);
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  // Time slot values (clinical routine hours)
  const availableSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  return (
    <div className="fixed inset-0 bg-navy/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-250">
      <div
        className="bg-navy border border-white/10 rounded-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in zoom-in duration-150"
        id="appointment-booking-modal"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-navy/95 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center z-10">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-xs font-bold text-white tracking-widest uppercase font-sans">
              {t.appointmentModalTitle}
            </span>
          </div>
          <button
            id="close-appointment-modal"
            onClick={isSuccess ? handleReset : onClose}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors focus:outline-none"
            aria-label="Close scheduler"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            /* SUCCESS FEEDBACK SCREEN */
            <div className="text-center py-8 space-y-6 animate-in zoom-in duration-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                <CheckCircle className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-display text-white">{t.appointmentFormSuccess}</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-light">
                  {t.appointmentFormSuccessDesc}
                </p>
              </div>

              {/* Quick Summary card */}
              <div className="card-glass p-6 rounded-xl text-left max-w-md mx-auto space-y-3 font-sans">
                <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                  <span className="text-slate-400">{t.appointmentFormName}</span>
                  <span className="text-white font-bold">{fullName}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                  <span className="text-slate-400">{t.appointmentFormDate}</span>
                  <span className="text-gold font-bold">{preferredDate} / {preferredTime}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">{t.appointmentFormTopic}</span>
                  <span className="text-slate-300 max-w-[200px] truncate font-semibold">
                    {specialties.find(s => s.id === topicId)?.title || topicId}
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  id="success-dismiss-btn"
                  onClick={handleReset}
                  className="bg-gold hover:bg-gold/90 text-navy font-bold px-8 py-3 rounded-sm text-xs uppercase tracking-widest transition-colors focus:outline-none"
                >
                  {t.expertiseModalClose}
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE APPOINTMENT FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <p className="text-xs text-slate-400 leading-relaxed card-glass p-4 rounded-lg mb-4">
                {t.appointmentModalSubtitle}
              </p>

              {/* Patient Full Name */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">
                  {t.appointmentFormName} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-slate-500" />
                  </span>
                  <input
                    type="text"
                    id="input-fullname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'TR' ? 'Örn: Ahmet Yılmaz' : 'e.g. John Doe'}
                    className={`w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded border ${
                      errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                    } focus:outline-none transition-all text-xs font-sans`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-400 text-xs flex items-center mt-1">
                    <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Phone & Email Dual Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {t.appointmentFormPhone} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Phone className="w-4 h-4 text-slate-500" />
                    </span>
                    <input
                      type="tel"
                      id="input-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+90 (___) ___ __ __"
                      className={`w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded border ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                      } focus:outline-none transition-all text-xs`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-xs flex items-center mt-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {t.appointmentFormEmail} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-slate-500" />
                    </span>
                    <input
                      type="email"
                      id="input-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="orn@email.com"
                      className={`w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded border ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                      } focus:outline-none transition-all text-xs`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs flex items-center mt-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Specialization / Topic Selector */}
              <div className="space-y-2 font-sans">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {t.appointmentFormTopic} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="select-topic"
                    value={topicId}
                    onChange={(e) => setTopicId(e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 text-slate-300 rounded border ${
                      errors.topicId ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                    } focus:outline-none transition-all text-xs cursor-pointer appearance-none`}
                  >
                    <option value="" className="bg-navy text-slate-400">{t.appointmentFormSelectTopic}</option>
                    {specialties.map((s) => (
                      <option key={s.id} value={s.id} className="bg-navy text-white">
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Clock className="w-4 h-4 text-slate-500" />
                  </span>
                </div>
                {errors.topicId && (
                  <p className="text-red-400 text-xs flex items-center mt-1">
                    <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                    <span>{errors.topicId}</span>
                  </p>
                )}
              </div>

              {/* Preferred Date & Preferred Time Slot Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                {/* Preferred Date */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {t.appointmentFormDate} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="input-date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 bg-white/5 text-slate-300 rounded border ${
                        errors.preferredDate ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                      } focus:outline-none transition-all text-xs cursor-pointer`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-red-400 text-xs flex items-center mt-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                      <span>{errors.preferredDate}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Time Dropdown */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {t.appointmentFormTime} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="select-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 text-slate-300 rounded border ${
                        errors.preferredTime ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-gold'
                      } focus:outline-none transition-all text-xs cursor-pointer appearance-none`}
                    >
                      <option value="" className="bg-navy text-slate-400">{language === 'TR' ? 'Saat seçiniz...' : 'Select a time...'}</option>
                      {availableSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-navy text-white">
                          {slot}
                        </option>
                      ))}
                    </select>
                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <Clock className="w-4 h-4 text-slate-500" />
                    </span>
                  </div>
                  {errors.preferredTime && (
                    <p className="text-red-400 text-xs flex items-center mt-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                      <span>{errors.preferredTime}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Diagnostic Notes or Concerns */}
              <div className="space-y-2 font-sans">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {t.appointmentFormNotes}
                </label>
                <div className="relative">
                  <span className="absolute top-3.5 left-3.5 flex items-start pointer-events-none">
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                  </span>
                  <textarea
                    id="input-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder={language === 'TR' ? 'Şikayetinizi kısaca açıklayabilirsiniz...' : 'Describe your concerns or health symptoms...'}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded border border-white/10 focus:border-gold focus:outline-none transition-all text-xs resize-none font-light"
                  />
                </div>
              </div>

              {/* Data Privacy / KVKK Consent Consent Box */}
              <div className="space-y-2 font-sans">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consent-checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="mt-1 mr-3 h-4 w-4 rounded border-white/10 accent-gold text-gold cursor-pointer"
                  />
                  <label htmlFor="consent-checkbox" className="text-xs text-slate-400 leading-normal cursor-pointer select-none font-light">
                    {t.appointmentFormPrivacyConsent}
                  </label>
                </div>
                {errors.privacyConsent && (
                  <p className="text-red-400 text-xs flex items-center mt-1">
                    <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                    <span>{errors.privacyConsent}</span>
                  </p>
                )}
              </div>

              {/* Submission Button panel */}
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  id="submit-appointment-btn"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-navy font-bold px-8 py-3.5 rounded-sm text-xs uppercase tracking-widest transition-all shadow-md shadow-gold/10 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-navy border-t-transparent animate-spin" />
                      <span>{t.appointmentFormSubmitting}</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>{t.appointmentFormSubmit}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
