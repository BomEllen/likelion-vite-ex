export type UIView = 'signin' | 'signup' | 'state-management';

export const getUIView = (): UIView => {
  const searchParams = new URLSearchParams(location.search);
  const uiView = searchParams.get('view') ?? 'signin';
  return uiView as UIView;
};
