/**
 * A simplified implementation of class-variance-authority (CVA) for demonstration
 * In a real application, use the actual 'class-variance-authority' package
 */

/**
 * Joins class names together
 */
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Type for variant configuration
 */
type VariantConfig = Record<string, Record<string, string>>;

/**
 * Creates a function for generating class names with variants
 */
function cva(base: string, config: {
  variants?: VariantConfig;
  defaultVariants?: Record<string, string>;
}) {
  const { variants = {}, defaultVariants = {} } = config;

  return function(props: Record<string, any> = {}) {
    const { className, ...variantProps } = props;
    
    const variantClasses: string[] = [];
    
    // For each variant type (e.g., size, color)
    Object.keys(variants).forEach(variantType => {
      // Get the selected variant or default
      const variantSelection = variantProps[variantType] || defaultVariants[variantType];
      
      // If a variant was selected, add its classes
      if (variantSelection && variants[variantType][variantSelection]) {
        variantClasses.push(variants[variantType][variantSelection]);
      }
    });
    
    return cn(base, ...variantClasses, className);
  };
}

/**
 * Type for variant props - simplified for demonstration
 */
type VariantProps<T extends (...args: any) => any> = Parameters<T>[0];

export { cva, type VariantProps };