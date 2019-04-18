declare var require: any;

function requireAll(requireContext: any) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('./', true, /^(?!.*(?:Spec.ts$)).*\.ts|.styl$/));
