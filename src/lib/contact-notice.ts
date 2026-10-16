export const CONTACT_NOTICE_EVENT = "hoyle:contact-notice";

export type ContactNoticeDetail = {
  message: string;
};

export function openContactNotice(message: string) {
  window.dispatchEvent(
    new CustomEvent<ContactNoticeDetail>(CONTACT_NOTICE_EVENT, {
      detail: { message },
    }),
  );
}
